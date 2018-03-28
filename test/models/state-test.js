let chai = require("chai"),
  path = require("path");

// Tell chai that we'll be using the "should" style assertions.
chai.should();

const { State } = require(path.join(__dirname, "..", "..", "src", "models", "state"));

describe("State", () => {

    let state;

    beforeEach(() => {
      	// Create a new object before every test.
        let stateData = {
            "players" : [
                {
                    "id" : 1,
                    "name" : "Team App Shack",
                    "cards" : [
                        {
                            "suit" : "spades",
                            "value" : 2
                        },
                        {
                            "suit" : "hearts",
                            "value" : 9
                        }
                    ],
                    "bet" : 20,
                    "bank_roll" : 1000,
                    "action" : null,
                    "is_bust" : false
                }
            ],
            "dealer" : {
                "cards" : [
                    {
                        "suit" : "spades",
                        "value" : 10
                    },
                    {
                        "suit" : null,
                        "value" : -1
                    }
                ]
            },
            "current_player" : "abc123"
        };
      	state = new State(stateData);
    });

    it("can create object", () => {
      state.players.length.should.equal(1);
      state.dealer.cards.length.should.equal(2);
    });

    it("can check if current players turn", () => {
      state.isCurrentPlayersTurn("abc123").should.equal(true);
    });

    it("can check if not current players turn", () => {
      state.isCurrentPlayersTurn("abc321").should.equal(false);
    });

});