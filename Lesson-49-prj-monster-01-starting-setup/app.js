function calcDamage(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            mHealth: 100,
            pHealth: 100,
            lastUsedSpecial: 0,
            lastUsedHeal: 0,
            combatLog: [],
            winner: ""
        }
    },
    computed: {
        monsterHealthBar() {
            const newHealth = this.mHealth < 0 ? 0 : this.mHealth
            return {
                width: newHealth + '%'
            };
        },
        playerHealthBar() {
            const newHealth = this.pHealth < 0 ? 0 : this.pHealth
            return {
                width: newHealth + '%'
            };
        },
        blockSpecial() {
            return (this.lastUsedSpecial < 3);
        },
        blockHeal() {
            return (this.lastUsedHeal < 2);
        }
    },
    watch: {
        pHealth(value) {
            if (value <= 0 && this.mHealth <= 0) {
                this.winner = 'draw';
            } else if (value <= 0) {
                this.winner = 'monster'
            }
        },
        mHealth(value) {
            if (value <= 0 && this.pHealth <= 0) {
                this.winner = 'draw';
            } else if (value <= 0) {
                this.winner = 'player';
            }
        }
    },
    methods: {
        addLog(source, event, value) {
            this.combatLog.unshift({
                source: source,
                event: event,
                amount: value
            })
        },
        startOver() {
            this.mHealth = this.pHealth = 100;
            this.lastUsedSpecial = this.lastUsedHeal = 0;
            this.combatLog = [];
            this.winner = "";
        },
        attackMonster() {
            const damage = calcDamage(5, 10);
            this.mHealth -= damage;
            this.addLog('player', 'attack', damage);
            this.attackPlayer();
        },
        attackPlayer() {
            const damage = calcDamage(8, 12);
            this.pHealth -= damage;
            this.addLog('monster', 'attack', damage);
            this.lastUsedSpecial++;
            this.lastUsedHeal++;
        },
        heal() {
            if (this.lastUsedHeal >= 2) {
                const healing = calcDamage(9, 17);
                this.pHealth += healing
                this.addLog('player', 'heal', healing);
                this.attackPlayer();
                this.lastUsedHeal = 0
            }
        },
        specialAttack() {
            if (this.lastUsedSpecial >= 3) {
                this.mHealth -= 20;
                this.addLog('player', 'special', 20);
                this.attackPlayer();
                this.lastUsedSpecial = 0;
            }
        },
        surrender() {
            this.winner = 'monster';
        }
    },
});

app.mount("#game");