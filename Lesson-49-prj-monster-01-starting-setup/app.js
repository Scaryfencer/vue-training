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
        }
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
        attackMonster() {
            this.monsterHealth -= randoNum(12, 5);
            this.attackPlayer();
        },
        attackPlayer() {
            this.playerHealth -= randoNum(15, 8);
            this.roundCounter++;
        },
        healPlayer() {
            this.playerHealth += randoNum(17, 10);
            if (this.playerHealth > 100) {
                this.playerHealth = 100
            };
            this.attackPlayer();
        },
        specialAttack() {
            if (!this.specialDisabled) {
                this.monsterHealth -= randoNum(20, 2);
                this.attackPlayer();
                this.lastSpecialUsedOnRd = this.roundCounter;
            }
        },
    },
});

monsterSlayer.mount('#game');