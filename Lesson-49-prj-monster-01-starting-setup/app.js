function randoNum(high, low) {
    return Math.floor(Math.random() * (high - low)) + low;
};

const monsterSlayer = Vue.createApp({
    data() {
        return {
            monsterHealth: 100,
            playerHealth: 100,
            roundCounter: 0,
            lastSpecialUsedOnRd: -3,
            winner: "",
            battleLog = [],
        }
    },
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                this.winner = "draw";
            } else if (value <= 0) {
                this.winner = "monster";
            }
        },
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                this.winner = "draw";
            } else if (value <= 0) {
                this.winner = "player";
            }
        },
    },
    computed: {
        monsterBarStyle() {
            return {
                width: this.monsterHealth + "%"
            }
        },
        playerBarStyle() {
            return {
                width: this.playerHealth + "%"
            }
        },
        specialDisabled() {
            return (this.roundCounter >= (this.lastSpecialUsedOnRd + 3)) ? false : true;
        },
    },
    methods: {
        addLogMsg(who, what, value) {
            this.battleLog.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value,
            });
        },
        attackMonster() {
            const attackMonsterValue = randoNum(12, 5);
            if (this.monsterHealth - attackMonsterValue < 0) {
                this.monsterHealth = 0;
            } else {
                this.monsterHealth -= attackMonsterValue;
            }
            this.addLogMsg('player', 'attack', attackMonsterValue);
            this.attackPlayer();
        },
        attackPlayer() {
            const attackPlayerValue = randoNum(15, 8);
            if (this.playerHealth - attackPlayerValue < 0) {
                this.playerHealth = 0;
            } else {
                this.playerHealth -= attackPlayerValue;
            }
            this.roundCounter++;
            this.addLogMsg('monster', 'attack', attackPlayerValue);
            console.log(`roundCounter = ${this.roundCounter}`);
        },
        healPlayer() {
            const healValue = randoNum(17, 10);
            if (this.playerHealth + healValue > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += healValue;
            }
            this.addLogMsg('player', 'heal', healValue);
            this.attackPlayer();
        },
        specialAttack() {
            const specialAttackValue = randoNum(20, 2);
            if (!this.specialDisabled) {
                this.monsterHealth -= specialAttackValue;
                this.addLogMsg('player', 'special attack', specialAttackValue);
                this.attackPlayer();
                this.lastSpecialUsedOnRd = this.roundCounter;
            }
        },
        surrender() {
            this.winner = "monster";
        },
        startOver() {
            this.monsterHealth = 100;
            this.playerHealth = 100;
            this.roundCounter = 0;
            this.lastSpecialUsedOnRd = -3;
            this.winner = "";
            this.battleLog = [];
        },
    },
});

monsterSlayer.mount('#game');