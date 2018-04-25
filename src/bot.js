class Bot {

	constructor(teamName) {
		this.teamName = teamName;
	}

	/*
	Returns the bet (number) placed by the bot.
	Possible bets: 1, 10, 22.5, 42.
	Minimum bet is 1.
	*/
	bet(you, players) {
		let yourBet = you.bet;
		let playersBets = players.map(player => player.bet);
		console.log("YOUR BET: ", JSON.stringify(yourBet));
		console.log("PLAYERS BETS: ", JSON.stringify(playersBets));

		return 10;
	}

	/*
	Returns the action (string) performed by the bot for a given hand.
	Possible actions: "hit", "double", "stand".
	*/
	action(you, dealer, players) {
		let yourHand = you.hand.cards;
		let playersHands = players.map(player => player.hand.cards);
		let dealerHand = dealer.hand.cards;
		console.log("YOUR HAND: ", JSON.stringify(yourHand));
		console.log("DEALERS HAND: ", JSON.stringify(dealerHand));
		console.log("PLAYERS HANDS: ", JSON.stringify(playersHands));
		
		/*
			TODO: Implement your own logic for playing the game.

			# # # # # # # # # #
			Example code: 
			if (simon.jokes.filter(joke => joke.isFunny).length > 0) {
				return "hit";
			}
			return "stand";
			# # # # # # # # # #
		*/
	}

}

module.exports = {
	Bot
};