import Vue from 'vue';
import Vuex from 'vuex';
import templates from '../api/templates';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // template
    templateName: 'default',
    templateUseIcons: true,
    templateImages: [],
    // game
    win: false,
    stars: 3,
    cardsFlipped: [],
    amountCardsFlipped: 0,
    amountMoves: 0,
    cardsMatched: 0,
    deck: {
      cards: [],
    },
    gameAccessibilityMessage: '',
    routeAccessibilityMessage: '',
  },

  getters: {
    templateImages: state => state.templateImages,
    deck: state => state.deck,
    accessibilityMessage: state => state.gameAccessibilityMessage,
    winningMessage: state =>
      state.stars === 1
        ? 'You won the game with 1 star left!'
        : `You won the game with ${state.stars} stars left!`,
    gameUpdate: state =>
      `You have ${state.amountMoves} total moves with ${state.stars} stars left.`,
  },

  mutations: {
    UPDATE_TEMPLATE(state, templatePayload) {
      state.templateName = templatePayload.name;
      state.templateUseIcons = templatePayload.useIcons;
      state.templateImages = templatePayload.images;
      state.templateFolder = templatePayload.folder;
    },

    SHUFFLE_DECK(state) {
      state.deck.cards = [];
      for (let index = 0; index < state.templateImages.length; index++) {
        state.deck.cards.push({
          name: state.templateImages[index],
          icon: state.templateUseIcons
            ? `fa fa-${state.templateImages[index]}`
            : null,
          img: !state.templateUseIcons
            ? `img/${state.templateFolder}/${state.templateImages[index]}.png`
            : null,
          // img: 'hp_heart.png',
          flipped: false,
          match: false,
          close: false,
        });
        state.deck.cards.push({
          name: state.templateImages[index],
          icon: state.templateUseIcons
            ? `fa fa-${state.templateImages[index]}`
            : null,
          img: !state.templateUseIcons
            ? `img/${state.templateFolder}/${state.templateImages[index]}.png`
            : null,
          flipped: false,
          match: false,
          close: false,
        });
      }

      // shuffle
      let shuffleCards = state.deck.cards;
      let currentIndex = state.deck.cards.length,
        temporaryValue,
        randomIndex;

      while (0 !== currentIndex) {
        // pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // and swap it with the current element.
        temporaryValue = state.deck.cards[currentIndex];
        shuffleCards[currentIndex] = state.deck.cards[randomIndex];
        shuffleCards[randomIndex] = temporaryValue;
      }
      state.deck.cards = shuffleCards;
    },

    NEW_GAME(state) {
      for (let i = 0; i < state.deck.cards.length; i++) {
        state.deck.cards[i].flipped = false;
        state.deck.cards[i].close = false;
        state.deck.cards[i].match = false;
      }
    },

    UPDATE_AMOUNT_CARDS_FLIPPED(state, payload) {
      state.amountCardsFlipped = payload;
    },

    UPDATE_CARDS_MATCHED(state) {
      state.cardsMatched = state.cardsMatched + 1;
    },

    RESET_CARDS_MATCHED(state) {
      state.cardsMatched = 0;
    },

    ADD_CARD_FLIPPED(state, payload) {
      state.cardsFlipped.push(payload);
      state.amountCardsFlipped += 1;
    },

    UPDATE_AMOUNT_MOVES(state, payload) {
      state.amountMoves = payload;
    },

    FLIP_CARD(state, cardPayload) {
      const { index, flipped } = cardPayload;
      state.deck.cards[index].flipped = flipped;
    },

    CLOSE_CARD(state, cardPayload) {
      const { index, flipped, close } = cardPayload;
      state.deck.cards[index].flipped = flipped;
      state.deck.cards[index].close = close;
    },

    MARK_MATCHED_CARD(state, index) {
      state.deck.cards[index].match = true;
    },

    RESET_CARDS_FLIPPED(state) {
      state.amountCardsFlipped = 0;
      state.cardsFlipped = [];
    },

    // accessibility message
    UPDATE_GAME_ACCESSIBILITY_MESSAGE(state, message) {
      state.gameAccessibilityMessage = message;
    },

    UPDATE_ROUTE_ACCESSIBILITY_MESSAGE(state, payload) {
      state.routeAccessibilityMessage = payload;
    },

    // win
    UPDATE_WIN(state, payload) {
      state.win = payload;
    },

    // stars
    UPDATE_STARS(state, payload) {
      state.stars = payload;
    },
  },

  actions: {
    // manage template
    getTemplate({ commit }, templateName) {
      const templateInformation = templates.getTemplateInformation(
        templateName,
      );
      commit('UPDATE_TEMPLATE', {
        name: templateInformation.name,
        useIcons:
          templateInformation.useIcons === undefined
            ? false
            : templateInformation.useIcons,
        images:
          templateInformation.images === undefined
            ? []
            : templateInformation.images,
        folder:
          templateInformation.folder === undefined
            ? []
            : templateInformation.folder,
      });
    },

    resetCardsFlipped({ commit }) {
      commit('RESET_CARDS_FLIPPED');
    },

    flipCard({ commit }, flipCardPayload) {
      commit('FLIP_CARD', flipCardPayload);
    },

    shuffle({ commit }) {
      commit('SHUFFLE_DECK');
    },

    updateCardsFlipped({ commit }, { cards }) {
      commit('ADD_CARD_FLIPPED', cards);
    },

    updateAmountMoves({ commit }, { moves }) {
      commit('UPDATE_AMOUNT_MOVES', moves);
    },

    newGame({ commit }) {
      commit('UPDATE_WIN', false);
      commit('UPDATE_AMOUNT_MOVES', 0);
      commit('RESET_CARDS_MATCHED');
      commit('SHUFFLE_DECK');
      commit('NEW_GAME');
      commit('RESET_CARDS_FLIPPED');
    },

    closeCard({ commit }, closeCardPayload) {
      commit('CLOSE_CARD', closeCardPayload);
    },

    markMatchedCards({ state, commit }, { cardName }) {
      for (let index = 0; index < state.deck.cards.length; index++) {
        if (state.deck.cards[index].name === cardName) {
          commit('MARK_MATCHED_CARD', index);
        }
      }
      commit('UPDATE_CARDS_MATCHED');
    },

    setNewMatch({ commit }) {
      commit('RESET_CARDS_FLIPPED');
    },

    updateAccessibilityMessage({ commit }, { message }) {
      commit('UPDATE_GAME_ACCESSIBILITY_MESSAGE', message);
    },

    updateRouteAccessibilityMessage({ commit }, { message }) {
      commit('UPDATE_ROUTE_ACCESSIBILITY_MESSAGE', message);
    },

    updateWin({ commit }, { win }) {
      commit('UPDATE_WIN', win);
    },

    updateStars({ state, commit }) {
      let stars = 0;
      if (state.amountMoves < 30) {
        stars = 3;
      } else if (state.amountMoves < 40) {
        stars = 2;
      } else if (state.amountMoves < 50) {
        stars = 1;
      } else if (state.amountMoves > 50) {
        stars = 0;
      }
      commit('UPDATE_STARS', stars);
    },
  },

  modules: {},
});
