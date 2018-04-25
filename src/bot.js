

class Bot {
	/*
		Enter your awesome team name here!
	*/
	constructor() {
		this.teamName = "your_team_here_yolo";
	}
	
	/*
	    Returns the bet (number) placed by the bot.
	    Possible bets: 1, 10, 22.5, 42.
	    Minimum bet is 1.
    */
	bet(you) {
		let bet = 100;
        return bet;
	}

    /*
    	Returns the action (string) performed by the bot for a given hand.
    	Possible actions: "hit", "double", "stand".
    	For a given hand, consider the variable named "value" to calculate the sum of your hand-
    	REMEMBER that all Aces is considered as 11.
    */
	action(you, dealer) {

			
		/**	
			SAMPLE CONTENT OF `you.hand.cards`
			[
				{"value":5,"realValue":5,"suit":"hearts","isHidden":false},
				{"value":8,"realValue":8,"suit":"spades","isHidden":false}
			]
		*/
        console.log("YOUR HAND: ", JSON.stringify(you.hand.cards));
        console.log("YOUR BANKROLL: ", JSON.stringify(you.bankRoll));
        console.log("YOUR BET: ", you.bet);
        /**
			SAMPLE CONTENT OF DEALERS HAND: 
			[
				{"value":10,"realValue":13,"suit":"clubs","isHidden":false}
			]
        */
        console.log("DEALERS HAND: ", JSON.stringify(dealer));

        
            /*TODO: Implement your own logic for playing the game.

            # # # # # # # # # #
            Example code: 
            if (simon.jokes.filter(joke => joke.isFunny).length > 0) {
                return "hit";
            }
            return "stand";
            # # # # # # # # # #
        	*/
        return "hit";
	}

	/*
		(Optional)
		Called when ever a player recives a new card
	*/
	state(you, dealer, players) {
		let yourHand = you.hand.cards
		let playersHands = players.map(player => player.hand.cards)
	}

}


module.exports = {
	Bot
};