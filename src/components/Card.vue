<template>
  <section>
    <button
      aria-describedby="gameUpdate"
      :aria-label="[ card.flipped ? card.name + ' flipped' : 'card ' + (index + 1)]"
      :class="cardClass"
      @click="flipCard()"
      :disabled="card.match"
    >
      <span v-if="!card.flipped">?</span>
      <div v-else-if="card.icon !== null" :class="card.icon"></div>
      <div v-else :class="[ extended ? 'card__svg-extended': 'card__svg']">
        <img v-if="card.img" :src="imageSource" />
      </div>
    </button>
  </section>
</template>

<script>
export default {
  name: "Card",
  props: ["card", "index", "extended"],
  computed: {
    imageSource() {
      return this.card.img ? require(`../assets/${this.card.img}`) : "";
    },

    cardClass() {
      const extendedClass = this.extended ? "card__extended" : "";
      if (this.card.match) {
        return `card ${extendedClass} match`;
      } else if (this.card.flipped) {
        return `card ${extendedClass} show`;
      } else if (this.card.close) {
        return `card ${extendedClass} close`;
      } else {
        return `card ${extendedClass}`;
      }
    }
  },
  methods: {
    flipCard() {
      this.$emit("onFlip");
    }
  }
};
</script>

<style lang="scss">
.card {
  height: 90px;
  width: 90px;
  font-size: 4em;
  background-blend-mode: soft-light;
  background: #061018 url(/img/fabric.5959b418.png);
  border: 1px solid #acacac;
  color: #ffffff;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 5px 2px 20px 0 rgba(46, 61, 73, 0.5);

  &:focus {
    outline: none;
  }

  @media (min-width: 450px) {
    height: 125px;
    width: 125px;
  }

  &__svg {
    height: 125px;
    width: 125px;
    margin: -2px 0 0 0;
    padding: 0;
    border-radius: 0.5rem;
    > img {
      height: 125px;
      width: 125px;
      margin: 0;
      padding: 0;
      border-radius: 0.5rem;
    }
  }

  &__extended {
    height: 112px;
    width: 112px;
  }

  &__svg-extended {
    height: 112px;
    width: 112px;
    margin: -2px 0 0 0;
    padding: 0;
    border-radius: 0.5rem;
    > img {
      height: 112px;
      width: 112px;
      margin: 0;
      padding: 0;
      border-radius: 0.5rem;
    }
  }
}

.cardItem {
  list-style: none;
}

.show {
  font-size: 33px;
  background: #0b5891 url(/img/fabric.5959b418.png);
  cursor: default;
}

.match {
  cursor: default;
  background: #0e4b5a url(/img/fabric.5959b418.png);
  font-size: 33px;
  animation-name: match-animation;
  -webkit-animation-name: match-animation;
  animation-duration: 1000ms;
  -webkit-animation-duration: 1000ms;
  transform-origin: 70% 70%;
  animation-iteration-count: 1000ms;
  animation-timing-function: linear;
}

.close {
  cursor: default;
  animation-name: close;
  -webkit-animation-name: close;
  animation-duration: 1000ms;
  -webkit-animation-duration: 1000ms;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  &:hover,
  &:focus {
    background-blend-mode: hard-light;
    color: #112c3e;
    border: 2px solid #112c3e;
  }
}

@keyframes match-animation {
  0%,
  100% {
    transform: scale(1);
  }
  60% {
    transform: scale(0.9);
  }
}

@keyframes close {
  0%,
  100% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(5deg);
  }
  80% {
    transform: rotate(-5deg);
  }
}
</style>