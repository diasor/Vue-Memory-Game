<template>
  <div class="home" aria-label="Memory Game Board">
    <p role="status" v-if="gameAccessibilityMessage">
      <b>Accessibilty Text:</b>
      {{ gameAccessibilityMessage }}
    </p>
    <Winning v-if="win" />

    <main class="container" id="main" tabindex="-1" aria-labelledby="gameTitle">
      <h2 id="gameTitle">Game Board</h2>
      <div aria-label="Theme selection" id="selection" class="select-container">
        <label>Select Theme:</label>
        <select
          type="text"
          v-model="gameTheme"
          name="theme"
          class="select-theme"
          @change="changeTemplate(gameTheme)"
        >
          <option>Default</option>
          <option>Animals</option>
          <option>Disney</option>
          <option>Harry Potter</option>
          <option>Harry Potter Extended</option>
        </select>
      </div>
      <section aria-label="Memory Game Board" id="cards">
        <ul :class="['cards', { 'cards__extended': extended }]">
          <li
            v-for="(card, index) in this.deck.cards"
            :key="index"
            :aria-label="[card.flipped ? card.name : '']"
            class="cardItem"
          >
            <Card
              :card="card"
              :index="index"
              :extended="extended"
              @onFlip="flipThisCard(card, index)"
            ></Card>
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import Card from "@/components/Card.vue";
import Winning from "@/components/Winning.vue";

export default {
  name: "Home",
  components: { Card, Winning },
  data: () => ({
    gameTheme: "",
    columns: 0
  }),
  computed: {
    ...mapState([
      "gameAccessibilityMessage",
      "win",
      "stars",
      "cardsFlipped",
      "amountCardsFlipped",
      "amountMoves",
      "cardsMatched"
    ]),
    ...mapGetters(["deck", "gameUpdate"]),
    extended() {
      return this.deck.cards.length > 16;
    }
  },
  methods: {
    ...mapActions([
      "updateAmountMoves",
      "updateCardsFlipped",
      "resetCardsFlipped",
      "shuffle",
      "flipCard",
      "closeCard",
      "markMatchedCards",
      "newGame",
      "updateAccessibilityMessage",
      "updateWin",
      "updateStars",
      "getTemplate"
    ]),

    flipThisCard(card, index) {
      if (card.flipped) {
        this.updateAccessibilityMessage({ message: "Card already flipped." });
        return;
      } else {
        this.updateAmountMoves({ moves: this.amountMoves + 1 });
        this.updateStars();
      }
      // only allow flips if there are < or = 2 flipped cards
      if (this.amountCardsFlipped < 2) {
        if (this.amountCardsFlipped < 1) {
          this.updateAccessibilityMessage({ message: `${card.name} flipped.` });
        }
        this.flipCard({ index, flipped: true });
        this.updateCardsFlipped({ cards: card });
        // was there a match?
        if (
          this.amountCardsFlipped === 2 &&
          this.cardsFlipped[0].name === this.cardsFlipped[1].name
        ) {
          // there is a match
          this.markMatchedCards({ cardName: card.name });
          const remaining = this.deck.cards.length / 2 - this.cardsMatched;
          this.updateAccessibilityMessage({
            message: `${card.name} flipped. Match found! ${remaining} matches left.`
          });

          // reset flipped cards
          this.resetCardsFlipped({ cards: this.cardsFlipped });
          // if number of cards matched = number or cards, then win the game
          if (this.cardsMatched === this.deck.cards.length / 2) {
            this.updateWin({ win: true });
            this.updateAccessibilityMessage({ message: this.winningMessage });
          }
        }
        // if there was not match
        else if (
          this.amountCardsFlipped === 2 &&
          this.cardsFlipped[0].name !== this.cardsFlipped[1].name
        ) {
          // wait before closing mismatched card
          this.updateAccessibilityMessage({
            message: `${card.name} flipped. No match. `
          });
          setTimeout(() => {
            for (let i = 0; i < this.deck.cards.length; i++) {
              if (this.deck.cards[i].flipped && !this.deck.cards[i].match) {
                this.closeCard({ index: i, flipped: false, close: true });
              }
            }
            this.resetCardsFlipped();
            return;
          }, 900);
        }
        console.log("CARD FLIP icon", card.icon);
      }
    },

    changeTemplate(newTheme) {
      // get thee new theme information
      this.getTemplate(newTheme);
      // reset values
      this.newGame();
      // shuffle a new deck
      this.shuffle();
    }
  },

  created() {
    this.gameTheme = "Default";
    // get the default theme information
    this.getTemplate(this.gameTheme);
    // shuffle a new deck
    this.shuffle();
  }
};
</script>

<style lang="scss">
$totalColumns: var(--columns);

.home {
  margin: 0;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 0;

  > h2 {
    margin: 0;
  }
}

.cards {
  margin: 0.3em auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 0.5em;
  padding: 0;

  @media (min-width: 450px) {
    grid-gap: 1em;
  }

  @media (min-width: 600px) {
    grid-gap: 1em;
    grid-template-columns: repeat(4, 1fr);
  }

  &__extended {
    @media (min-width: 450px) {
      grid-gap: 0.5em;
    }

    @media (min-width: 600px) {
      grid-template-columns: repeat(6, 1fr);
    }
  }
  // Game Controller
  .gameController .stars {
    padding: 0px;
    display: inline-block;
    margin: 2em auto 0;
  }

  .star {
    list-style: none;
    display: inline-block;
    margin: 0 0.2em;
    font-size: 1.5em;
  }

  .moves {
    font-weight: bold;
  }

  .gameController .restart {
    float: right;
    cursor: pointer;
  }

  // Overall
  [role="status"] {
    height: 0;
    margin: 0;
    overflow: hidden;
    font-weight: bold;
  }

  #gameUpdate {
    height: 0;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  .reset {
    padding-left: 1em;
  }

  > p {
    margin-top: 0;
    background-color: pink;
  }
}

/* select styles */
.select-container {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-bottom: 0.3rem;

  > label {
    margin-top: 0.6rem;
    padding: 0.2rem 0.5rem;
    width: auto;
  }

  > p {
    width: 20rem;
  }
}

.select-theme {
  display: block;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.3;
  padding: 0.6em 1.4em 0.5em 0.8em;
  width: 12rem;
  box-sizing: border-box;
  margin: 0;
  border: 1px solid #aaa;
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
  border-radius: 0.5em;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  outline: none;
  color: black;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E"),
    linear-gradient(to bottom, #ffffff 0%, #e5e5e5 100%);
  background-repeat: no-repeat, repeat;
  background-position: right 0.7em top 50%, 0 0;
  background-size: 0.65em auto, 100%;
  &:-ms-expand {
    display: none;
  }
}
.select-theme option {
  font-weight: normal;
}
</style>
