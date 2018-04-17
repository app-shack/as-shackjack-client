class Bot {
	constructor(teamName) {
		this.teamName = teamName
	}


	bet(you, players) {
		// min bet is 1
		let yourBet = you.bet
		let playersBets = players.map(player => player.bet)
		console.log("YOUR BET: ", JSON.stringify(yourBet));
		console.log("PLAYERS BETS: ", JSON.stringify(playersBets));

		return 10
	}

	action(you, dealer, players) {
		// min bet is 1
		let yourHand = you.hand.cards
		let playersHands = players.map(player => player.hand.cards)
		let dealerHand = dealer.hand.cards
		console.log("YOUR HAND: ", JSON.stringify(yourHand));
		console.log("DEALERS HAND: ", JSON.stringify(dealerHand));
		console.log("PLAYERS HANDS: ", JSON.stringify(playersHands));

		return "hit"
	}

}

module.exports = {
	Bot
};