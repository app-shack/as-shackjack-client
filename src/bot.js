

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

    action(you, dealer) {
        // min bet is 1
        let yourHand = you.hand.cards
        let dealerHand = dealer.hand.cards

        return this.evaluateAction(yourHand, dealerHand)

    }

    evaluateAction(yourHand, dealersHand) {

        let yourHandValue = you.hand.sum()
        let dealerHandValue = dealersHand.reduce( (a, b) => { return a.value + b.value }, 0);
        console.log("YOUR HAND VALUE: ", JSON.stringify(yourHandValue));
        console.log("DEALERS HAND VALUE: ", JSON.stringify(dealerHandValue));

        if ((yourHandValue > 12 && dealerHandValue < 7) || yourHandValue > 16) {
            return "stand"
        } else if (yourHandValue === 9 && dealerHandValue < 7) {
            return "double"
        } else {
            return "hit"
        }
    }
}


module.exports = {
    Bot
};
