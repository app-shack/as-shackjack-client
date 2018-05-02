

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

        return 11
    }

    action(you, dealer, players) {
        // min bet is 1
        let yourHand = you.hand.cards
        let playersHands = players.map(player => player.hand.cards)
        let dealerHand = dealer.hand.cards
        console.log("YOUR HAND: ", JSON.stringify(yourHand));
        console.log("DEALERS HAND: ", JSON.stringify(dealerHand));
        //console.log("PLAYERS HANDS: ", JSON.stringify(playersHands));

        return this.evaluateAction(yourHand, dealerHand, playersHands)
        // var min = 1;
        // var max = 10;
        // // and the formula is:
        // var random = Math.floor(Math.random() * (max - min + 1)) + min;
        // if (random < 4) {
        //     return "stand"
        // } else if (random < 8) {
        //     return "hit"
        // } else {
        //     return "double"
        // }
    }

    evaluateAction(yourHand, dealersHand, playersHand) {

        let yourHandValue = you.hand.sum()
        let dealerHandValue = dealersHand.reduce( (a, b) => { return a.value + b.value }, 0);
        let playersHandValue = playersHand.map(player => {player.reduce((a,b) => {return a+b}, 0)});
        console.log("YOUR HAND VALUE: ", JSON.stringify(yourHandValue));
        console.log("DEALERS HAND VALUE: ", JSON.stringify(dealerHandValue));
        //console.log("PLAYERS HANDS VALUE: ", JSON.stringify(playersHands));

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
