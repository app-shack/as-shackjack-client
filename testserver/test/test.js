const assert = require('assert');
const {Player} = require("../src/player");
const {Hand} = require("../src/hand");
const {Card, Deck} = require("../src/deck")


describe('Player', function() {
  describe('#constructor()', function() {
    it('should have teamName and bankRoll assigned', function() {
    	 var p = new Player("team as");
      	assert.equal(p.teamName, "team as");
      	assert(p.bankRoll > 0);
    });
  });
});

describe('Deck', function() {
  describe('#standardDeck()', function() {
    it('Deck should have correct setup', function() {
        var deck = new Deck();
        var numDecks = require('../src/settings').numberOfDecks;
        assert.equal(deck.cards.filter(card => (card.value == 1)).length, 4*numDecks);
        assert.equal(deck.cards.filter(card => (card.value == 2)).length, 4*numDecks);
        assert.equal(deck.cards.filter(card => (card.value == 3)).length, 4*numDecks);
        assert.equal(deck.cards.filter(card => (card.value == 4)).length, 4*numDecks);
        assert.equal(deck.cards.filter(card => (card.value == 5)).length, 4*numDecks);
        assert.equal(deck.cards.filter(card => (card.value == 6)).length, 4*numDecks);
        assert.equal(deck.cards.filter(card => (card.value == 7)).length, 4*numDecks);
        assert.equal(deck.cards.filter(card => (card.value == 8)).length, 4*numDecks);
        assert.equal(deck.cards.filter(card => (card.value == 9)).length, 4*numDecks);
        assert.equal(deck.cards.filter(card => (card.value == 10)).length, 4*numDecks*4);
        assert.equal(deck.cards.filter(card => (card.value == 11)).length, 4*numDecks);
    });
  });
    describe('#cardCount()', function() {
    it('cardCount should represent the length of the cards array', function() {
        var deck = new Deck();
        assert.equal(deck.cardCount(), deck.cards.length);
    });
  });
  describe('#pickOne()', function() {
    it('Taking one card from a deck will decrement its length by 1', function() {
        var deck = new Deck();
        var numCards = deck.cardCount()
        deck.pickOne()
        assert.equal(numCards - 1, deck.cardCount());
    });
  });
  describe('#pickTwo()', function() {
    it('Taking two cards from a deck will decrement its length by 2', function() {
        var deck = new Deck();
        var numCards = deck.cardCount()
        deck.pickTwo()
        assert.equal(numCards - 2, deck.cardCount());
    });
  });
  describe('#pickTwoForDealer()', function() {
    it('Taking two cards from a deck will decrement its length by 2 (dealer)', function() {
        var deck = new Deck();
        var numCards = deck.cardCount()
        deck.pickTwoForDealer()
        assert.equal(numCards - 2, deck.cardCount());
    });
  });
  // describe('#pickTwoForDealer()', function() {
  //   it('One of the two dealer cards should be hidden', function() {
  //       var deck = new Deck();
  //       var numCards = deck.cardCount()
  //       cards = deck.pickTwoForDealer()
  //       assert.equal(cards.filter(card => card.isHidden).length, 1);
  //   });
  // });
});

describe('Hand', function() {
  describe('#isBust()', function() {
    it('should be bust if sum of card values equals larger than 21', function() {
    	var hand = new Hand();
    	hand.addCard(new Card(10, "hearts"));
    	hand.addCard(new Card(2, "hearts"));
    	hand.addCard(new Card(10, "hearts"));
      	assert(hand.isBust());
    });
    it('should not be bust if sum of card values equals smaller than or equal 21', function() {
    	var hand = new Hand();
    	hand.addCard(new Card(10, "hearts"));
    	hand.addCard(new Card(10, "hearts"));
    	hand.addCard(new Card(1, "hearts"));
      	assert(!hand.isBust());
    });
  });
});