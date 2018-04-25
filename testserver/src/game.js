const {Card, Deck} = require("./deck")
const {Player} = require("./player")
const {Hand} = require("./hand")
const utils = require("./utils");
const sleep = require('sleep');
const config = require("./settings");

function log(msg) {
    console.log(msg)
}

class Game {

    constructor(socket) {
        this.socket = socket
        this.players = []
        this.deadPlayers = []
        this.state = {}
        this.deck = new Deck();
        this.dealer = new Player(config.dealerName, true)
        this.state = "register"
    }

    registerPlayer(player) {
        this.players.push(player)
    }

    begin() {
        this.shufflePlayers()
        // log("order is")
        this.players.forEach((player, index) => {
            player.order = index
            // log("" + (index + 1) + ": " + player.teamName);
        });
        this.socket.sendOnPlayersOrderUpdatedEvent(this.players)
        this.newRound()
    }

    clearTable() {
        this.players.forEach(function(player) {
            player.setHand([])
            player.action == null
        })
        this.dealer.setHand([])
        
    }

    newRound() {
        let deadPlayers = this.players.filter(player => player.bankRoll <= 0)
        this.deadPlayers = this.deadPlayers.concat(deadPlayers)
        this.players = this.players.filter(player => player.bankRoll > 0)

        if (!(this.players.length > 0)) {
            this.gameOver()
            return
        }
        log("\n\n\n\n### NEW ROUND ###\n\n")

        this.clearTable()

        this.collectBets(0, function() {
            this.stateUpdated()
            this.deal()
            .then(this.collectActions(0, function() {
                this.startDealerRound()
                this.newRound()
                this.socket.roundOver()
            }.bind(this)))
        }.bind(this))
    }


    shufflePlayers() {
        utils.shuffle(this.players);
    }

    deal() {
        return new Promise(function(done) {
            this.players.forEach(function(player) {
                player.setHand(this.deck.pickTwo());
            }.bind(this))
            this.dealer.setHand(this.deck.pickTwoForDealer());
            this.dealer.concealFirstCard = true
            this.stateUpdated()
            done()
        }.bind(this))
    }

    collectBets(index, exit) {
    	sleep.msleep(config.defaultDelay)
        if (index == this.players.length) {
            log("- ALL BETS COLLECTED -\n");
            this.players.forEach(function(player) {
                player.action = null
            })
            this.stateUpdated()
            exit()
            return
        }
        this.state = "bet"
        return new Promise(function(done) {

            let target = this.players[index]
            this.socket.requestBet(target, this.getGameState())
                .then(data => {
                    target.bumpNumberOfRounds()
                    // target.action = null
                    target.placeBet(data.amount)
                    this.collectBets(index+1, exit)
                    this.stateUpdated()
                });
        }.bind(this));
    }

    collectActions(index, exit) {
    	sleep.msleep(config.defaultDelay)
        if (index == this.players.length) {
            log("- ALL ACTIONS COLLECTED -\n");
            this.stateUpdated()
            exit()
            return
        }
		this.state = "playing"
        return new Promise(function(done) {

            let target = this.players[index]
            if (target.cardSum() < 21) {
                this.socket.requestAction(target, this.getGameState())
                .then(data => {
                    this.performRound(target, data.action)
                    this.stateUpdated()
                    if(target.isBust() || data.action === "stand" || data.action === "double") {
                        log("["+ target.teamName + "]" + (target.isBust() ? " is bust with " + target.cardSum() : " stands"))
                        this.collectActions(index+1, exit)
                    } else {
                        log("TARGET " + target.teamName + " has " + target.cardSum())
                        this.collectActions(index, exit)
                    }
                })
            } else {
                this.collectActions(index+1, exit)
            }
            
        }.bind(this))
    }


    performRound(player, action) {
        switch(action) {
            case "hit":
                player.hit(this.deck);
                break;
            case "stand":
                player.stand(this.deck);
                break;
            case "double":
                player.double(this.deck);
                break;
        }
    }

    gameOver() {
        this.state = "end"
        this.stateUpdated()
    }

    handleDealerMustStop() {

        var dealerScore = this.dealer.cardSum()

        this.players.forEach(function(player) {
            if (player.isBust()) {
                player.lose()
            } else if (player.cardSum() < this.dealer.cardSum()) {
                player.lose()
            } else if(player.cardSum() ===  this.dealer.cardSum() && player.cardSum() < 21) {
                player.split()
            } else {
                log("handleDealerMustStop .. win")
                log("player cardsum: " + player.cardSum())
                log("dealer cardsum: " + this.dealer.cardSum())
                player.win()
            }
        }.bind(this))

    }

    handleDealerBust() {
        this.players
            .forEach(function(player) {
                if (player.isBust()) {
                    player.lose()
                } else {
                    log("handleDealerBust .. win")
                    log("player cardsum: " + player.cardSum())
                    log("dealer cardsum: " + this.dealer.cardSum())
                    player.win()
                } 
            }.bind(this))
    }

    startDealerRound() {
        this.dealer.concealFirstCard = false
        var cards = this.dealer.hand.cards
        this.stateUpdated()
        sleep.msleep(config.defaultDelay)
        while(this.dealer.cardSum() < 17) {
            // dealer must stand when passing 17
            this.dealer.hit(this.deck)
            log("[DEALER]" + " hits" + " (" + this.dealer.cardSum() +")")
            this.stateUpdated()
            sleep.msleep(500);
        }

        sleep.msleep(config.defaultDelay)
        if(this.dealer.isBust()) {
            this.handleDealerBust()
            log("[DEALER] is"+ " bust")
        } else {
            this.handleDealerMustStop()
            log("[DEALER]"+ " must stop")
        }
        sleep.msleep(config.defaultDelay)
        this.printPlayersAlive()
        this.stateUpdated()
    }

    printPlayersAlive() {
        log("Players alive: " + this.players.filter(player => player.bankRoll > 0)
            .map(player => player.teamName + "(" + player.bankRoll + ")").join(", ")
            );
    }

    getGameState() {
        this.players.map(player => player.summarizedHand = player.cardSum())
    	var gameState = {};
        gameState.state = this.state
        gameState.players = this.players;
        gameState.deadPlayers = this.deadPlayers;
        if ( this.dealer.concealFirstCard ) {
            let hand = new Hand();
            hand.addCard(Card.hiddenCard());
            hand.addCard(this.dealer.hand.cards[1]);
            gameState.dealersHand = {teamName: this.dealer.teamName, hand: hand};    
        } else {
            gameState.dealersHand = {teamName: this.dealer.teamName, hand: this.dealer.hand};    
        }
        return gameState
    }

    stateUpdated() {
        let state = this.getGameState()
        this.socket.stateUpdated(state)
    }

}

module.exports = {
    Game
};