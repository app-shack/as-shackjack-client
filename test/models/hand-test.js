let chai = require("chai"),
  path = require("path");

// Tell chai that we'll be using the "should" style assertions.
chai.should();

const { Hand } = require(path.join(__dirname, "..", "..", "src", "models", "hand"));
const { Card } = require(path.join(__dirname, "..", "..", "src", "models", "card"));

describe("Hand", () => {

    let hand;

    beforeEach(() => {
      	// Create a new object before every test.
      	hand = new Hand();
    });

    it("return empty hand", () => {
      	hand.cards.length.should.equal(0);
    });

    it("can add card", () => {
	    let cardData = {
    			"value" : 2,
    			"suit" : "hearts",
    			"isHidden" : false
      	};
      	let card = new Card(cardData);
      	hand.addCard(card);
      	hand.cards.length.should.equal(1);
    });

    it("can count cards", () => {
       	let cardData = [{
    			"value" : 2,
    			"suit" : "hearts",
    			"isHidden" : false
          	},
          	{
    			"value" : 9,
    			"suit" : "spades",
    			"isHidden" : false
      	}];
      	let cards = cardData
      		.map(card => new Card(card))
      		.forEach(card => hand.addCard(card));
      
      	hand.count().should.equal(2);
    });
    
    it("can sum cards", () => {
       	let cardData = [{
    			"value" : 2,
    			"suit" : "hearts",
    			"isHidden" : false
          	},
          	{
    			"value" : 9,
    			"suit" : "spades",
    			"isHidden" : false
      	}];
      	let cards = cardData
      		.map(card => new Card(card))
      		.forEach(card => hand.addCard(card));
      
      	hand.sum().should.equal(11);
    });

    it("can check if bust", () => {
        // Assert that the width can be changed.
       	let cardData = [{
    			"value" : 12,
    			"suit" : "hearts",
    			"isHidden" : false
          	},
          	{
    			"value" : 10,
    			"suit" : "spades",
    			"isHidden" : false
      	}];
      	let cards = cardData
      		.map(card => new Card(card))
      		.forEach(card => hand.addCard(card));
      
      	hand.sum().should.equal(22);
      	hand.isBust().should.equal(true);
    });

    it("can check if not bust", () => {
        // Assert that the width can be changed.
       	let cardData = [{
    			"value" : 2,
    			"suit" : "hearts",
    			"isHidden" : false
          	},
          	{
    			"value" : 9,
    			"suit" : "spades",
    			"isHidden" : false
      	}];
      	let cards = cardData
      		.map(card => new Card(card))
      		.forEach(card => hand.addCard(card));
      
      	hand.sum().should.equal(11);
      	hand.sum().should.lessThan(22);
      	hand.isBust().should.equal(false);
    });
});