const strategy = require('./models/strategy').Strategy
const {Counter} = require('./models/counter')


class Bot {

	constructor(teamName) {
		this.teamName = teamName
		this.counter = new Counter()
		this.myHands = null
		this.dealerHands = null
		this.playerHands = null
	}

	/*
	    Returns the bet (number) placed by the bot.
	    Possible bets: 1, 10, 22.5, 42.
	    Minimum bet is 1.
    */
	bet(you, players) {
		// New round i guess? whad upd!
		this.myHands = null
		this.dealerHands = null
		this.playerHands = null


		// Bankroll management?!
		// Bet size is (counter.trueCount() - 1) * minBet
		// minBet = (1/1000 of stacksize) * 0,25
		let minBet = 1/1000 * you.bankRoll * 1.25
		let trueCount = this.counter.trueCount()-1

		if (trueCount > 0) {
			return trueCount * minBet
		}  else {
			return minBet
		}

		// let yourBet = you.bet;
  //       let playersBets = players.map(player => player.bet);
  //       console.log("YOUR BET: ", JSON.stringify(yourBet));
  //       console.log("PLAYERS BETS: ", JSON.stringify(playersBets));

  //       return 1;
	}

    /*
    	Returns the action (string) performed by the bot for a given hand.
    	Possible actions: "hit", "double", "stand".
    */
	action(you, dealer) {
		let yourHand = you.hand.cards

		var dealerCount = 0
		dealer.map(card => {
			dealerCount += card.value > 0 ? card.value : 0	
		})
		if (strategy[you.hand.sum()] && strategy[you.hand.sum()][dealerCount]) {
			return strategy[you.hand.sum()][dealerCount]
		} else {
			return "stand"
		}

		// let yourHand = you.hand.cards;
  //       console.log("YOUR HAND: ", JSON.stringify(yourHand));
  //       console.log("DEALERS HAND: ", JSON.stringify(dealer));

        
  //           TODO: Implement your own logic for playing the game.

  //           # # # # # # # # # #
  //           Example code: 
  //           if (simon.jokes.filter(joke => joke.isFunny).length > 0) {
  //               return "hit";
  //           }
  //           return "stand";
  //           # # # # # # # # # #
        
  //       return "hit";
	}

	/*
		(Optional)
		Called when ever a player recives a new card
	*/
	state(you, dealer, players) {
		let yourHand = you.hand.cards
		let playersHands = players.map(player => player.hand.cards)

		this.myHands = this.runCounter(this.myHands, yourHand)
		this.dealerHands = this.runCounter(this.dealerHands, dealer)
		this.playerHands = this.runCounter(this.playerHands, playersHands)
	}

	runCounter(oldHand, hand) {
		if (!oldHand || oldHand.length === 0) {
			this.counter.addHand(hand)
			oldHand = hand
		} else {
			let currentHandCount = oldHand.length
			if (hand.length > currentHandCount) {
				let newCard = hand[currentHandCount]
				this.counter.addCard(newCard)
				oldHand = Object.assign({}, oldHand, hand)
			}
		}
		return oldHand
	}
}


module.exports = {
	Bot
};