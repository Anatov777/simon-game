<template>
  <div class="game">
    <h1>Simon Game</h1>
    <div class="game__content">
        <div class="game__item game__item_1" @click="clicked(1)" :class="{lit: isLit[1]}"></div>
        <div class="game__item game__item_2" @click="clicked(2)" :class="{lit: isLit[2]}"></div>
        <div class="game__item game__item_3" @click="clicked(3)" :class="{lit: isLit[3]}"></div>
        <div class="game__item game__item_4" @click="clicked(4)" :class="{lit: isLit[4]}"></div>
    </div>
    <div class="game__start-btn" @click="startGame">{{ centerButton }}
        <span v-show="playing">{{ showScore }}</span>
    </div>
    <div class="game__mode">
      <p>Mode: </p>
      <button :class="{active: activeBtn === 'btn1'}" @click="gameMode = 'easy'; activeBtn = 'btn1'">Easy</button>
      <button :class="{active: activeBtn === 'btn2'}" @click="gameMode = 'normal'; activeBtn = 'btn2'">Normal</button>
      <button :class="{active: activeBtn === 'btn3'}" @click="gameMode = 'hard'; activeBtn = 'btn3'">Hard</button>
  </div>
  </div>
</template>

<script>
export default {
  name: 'SimonGame',
  data() {
    return {
      centerButton: "START",
      playing: false,
      isClickable: false,
      isWon: false,
      isWrong: false,
      gameMode: 'normal',
      activeBtn: 'btn2',
      score: 0,
      sequence: [],
      sequenceInterval: null,
      playerSequence: [],
      sounds: {
        1: "sounds/error.mp3",
        2: "sounds/govilive.mp3",
        3: "sounds/plip.mp3",
        4: "sounds/sswitch1.mp3"
      },
      isLit: {
        1: false,
        2: false,
        3: false,
        4: false
      }
    }
  },
  computed: {
    showScore() {
      if (this.isWon) {
        return "Play Again?";
      }
      return "Score: " + this.score;
    }
  },
  methods: {
    playSound(tile) {
      if(this.sounds[tile]) {
        var audio = new Audio(this.sounds[tile]);
        audio.play();
      }
    },
    startGame() {
      this.playing = true;
      this.sequence = [];
      this.playerSequence = [];
      this.centerButton = "RESET";
      this.isWon = false;
      this.isWrong = false;
      this.score = 0;
      clearInterval(this.sequenceInterval);
      this.showSequence();
    },
    clicked(tile) {
      if (this.isClickable) {
        this.playSound(tile);
        this.lightUp(tile);
        this.playerSequence.push(tile);
        this.checkWinLose();
      }
    },
    checkWinLose() {
      // check for incorrect
      for (let i = 0; i < this.playerSequence.length; i++) {
        if (this.playerSequence[i] !== this.sequence[i]) {
          this.playerSequence = [];
          this.centerButton = "Wrong!";
          this.isWrong = true;
          setTimeout(() => {
            this.centerButton = "RESET";
            this.isWrong = false;
          }, 1000);
          this.showSequence(true);
        }
      }
      // if all correct and same length , continue
      if (this.playerSequence.length === this.sequence.length) {
        this.playerSequence = [];
        this.score++;
        // if win condition, show win, dont continue.
        if (this.score === 3) {
          this.centerButton = "Winner!";
          this.isClickable = false;
          this.isWon = true;
        } else {
          this.showSequence();
        }
      }
    },
    lightUp(tile) {
      this.isLit[tile] = true;
      setTimeout(() => {
        this.isLit[tile] = false;
      }, 300);
    },
    showSequence(redo) {
      let currentIndex = 0;
      let speed = this.sequence.length === 0 ? 1000 : this.getModeSpeed(this.gameMode);
      this.isClickable = false;
      if (!redo) {
        // dont add number on incorrect answers
        this.sequence.push(Math.floor(Math.random() * 4 + 1));
      }
      this.sequenceInterval = setInterval(() => {
        if (currentIndex >= this.sequence.length) {
          clearInterval(this.sequenceInterval);
          return (this.isClickable = true);
        }
        this.playSound(this.sequence[currentIndex]);
        this.lightUp(this.sequence[currentIndex]);
        currentIndex++;
      }, speed);
    },
    getModeSpeed(mode) {
      if (mode === 'easy') {
        return 1500;
      }
      else if (mode === 'normal') {
        return 1000;
      }
      else {
        return 400;
      }
    }
  }
}
</script>