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
	}

	action(you, dealer) {
		var dealerCount = 0
		dealer.hand.cards.map((card) => {
			if (card)
				dealerCount += card.value > 0 ? card.value : 0
		})
		if (strategy[you.hand.sum()] && strategy[you.hand.sum()][dealerCount]) {
			return strategy[you.hand.sum()][dealerCount]
		} else {
			return "stand"
		}
	}

	state(you, dealer, players) {
		let yourHand = you.hand.cards
		let dealersHand = dealer.hand.cards
		let playersHands = players.map(player => player.hand.cards)
		this.myHands = this.runCounter(this.myHands, yourHand)
		this.dealerHands = this.runCounter(this.dealerHands, dealersHand)
		this.playerHands = this.runCounter(this.playerHands, playersHands)
	}

	runCounter(oldHand, hand) {
		if (!oldHand) {
			this.counter.addHand(hand)
			oldHand = hand
		} else {
			let currentHandCount = oldHand.length
			console.log(currentHandCount)
			console.log(hand.length)
			console.log("-----")
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