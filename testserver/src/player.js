var config = require('./settings');
const {Hand} = require("./hand");
class Player {
    
    constructor(teamName, isDealer = false) {
        this.numberOfRounds = 0
        this.teamName = teamName
        this.bankRoll = config.initialCredit;
        this.hand = new Hand();
        this.action = null
        this.bet = 0
        this.isDead = false
        this.isDealer = isDealer
        this.concealFirstCard = isDealer
    }

    setHand(cards) {
        this.hand.cards = cards;
        this.checkBust()
    }

    checkBust() {
        this.bust = this.isBust()
    }

    isBust() {
        return this.hand.isBust()
    }
    
    addCard(card) {
        this.hand.addCard(card);
        this.checkBust()
    }

    cardSum() {
        return this.hand.sum()
    }

    double(deck) {

       if (this.bankRoll >= this.bet*2) {
            this.action = "double"
            this.bet *= 2
            this.addCard(deck.pickOne())
        } else {
            this.hit(deck)
        }
    }

    stand(deck) {
        this.action = "stand"
    }

    hit(deck) {
        this.action = "hit"
        this.addCard(deck.pickOne())
    }

    win() {
        if (this.cardSum() === 21 && this.hand.cardCount() === 2) {
            // black jack!
            this.bankRoll += 1.5*this.bet;
        } else {
            this.bankRoll += this.bet;
        }
        this.bet = 0
        this.isDead = this.bankRoll <= 0
    }

    lose() {
        this.bankRoll -= this.bet;
        this.bet = 0
        this.isDead = this.bankRoll <= 0
    }

    split() {
        this.bet = 0
        this.isDead = this.bankRoll <= 0
    }

    bumpNumberOfRounds() {
        this.numberOfRounds++
    }

    placeBet(credit) {
        if (this.bankRoll >= credit) {
            this.bet = credit;
        } else {
            this.bet = this.bankRoll;
        }
    }
}

module.exports = {
    Player
};