<template>
  <div class="win">
    <div class="win-container">
      <h2
        id="congratulations"
        aria-labelledby="congratulations winningMsg"
        v-focus
        tabindex="-1"
      >
        Congratulations!
      </h2>
      <ul class="stars" :aria-label="stars + ' stars left'">
        <li v-for="(star, index) in stars" :key="index">
          <i :class="`${index} fa fa-star`"></i>
        </li>
      </ul>
      <p id="winningMsg">{{ winningMessage }}</p>
      <button class="buttonGray" @click="playAgain()">Play again</button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapState, mapGetters, mapActions } from 'vuex';
import VueConfetti from 'vue-confetti';
Vue.use(VueConfetti);

export default {
  name: 'Winning',
  computed: {
    ...mapState(['stars', 'templateName']),
    ...mapGetters(['winningMessage']),
  },
  methods: {
    ...mapActions(['newGame', 'shuffle', 'getTemplate']),

    startConfetti() {
      this.$confetti.start();
    },

    stopConfetti() {
      this.$confetti.stop();
    },

    playAgain() {
      // play again with the last template selected
      this.getTemplate('Default');
      this.newGame();
      this.shuffle();
    },
  },

  mounted() {
    this.startConfetti();
  },

  beforeDestroy() {
    this.stopConfetti();
  },
};
</script>

<style lang="scss">
/* if you win */
.win-container {
  margin: 0;
  padding: 0;

  > h2 {
    margin: 0;
  }
}

.win {
  text-align: center;
  padding: auto;
  margin: auto;

  > h1 {
    font-weight: bold;
  }

  .stars {
    margin: 0;
    padding: 0;
    display: inline-block;
    margin: 0 5px 0 0;
  }

  .stars li {
    list-style: none;
    display: inline-block;
  }

  > p {
    padding: 0.2em;
  }
}

.buttonGray {
  background: #2e3d49;
  font-size: 1em;
  color: #ffffff;
  border-radius: 8px;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  padding: 0.5em;
  box-shadow: 5px 2px 20px 0 rgba(46, 61, 73, 0.5);
  &:hover,
  &:focus {
    background: #0b5891;
  }
}
</style>
