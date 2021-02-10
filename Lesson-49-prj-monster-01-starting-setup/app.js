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
            combatLog: []
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
    methods: {
        attackMonster() {
            const damage = calcDamage(5, 10);
            this.mHealth -= damage; 
            this.combatLog.push({type: 'damage', dest: 'monster', source: 'player', amount: damage});
            this.attackPlayer();
        },
        attackPlayer() {
            const damage = calcDamage(8, 12);
            this.pHealth -= damage;
            this.combatLog.push({type: 'damage', dest: 'player', source: 'monster', amount: damage});
            this.lastUsedSpecial++;
            this.lastUsedHeal++;
        },
        heal() {
            if (this.lastUsedHeal >= 2) {
                const healing = calcDamage(9, 17);
                this.pHealth += healing
                this.combatLog.push({type: 'heal', dest: 'player', source: 'player', amount: healing});
                this.attackPlayer();
                this.lastUsedHeal = 0
            }
        },
        specialAttack() {
            if (this.lastUsedSpecial >= 3) {
                this.mHealth -= 20;
                this.attackPlayer();
                this.lastUsedSpecial = 0;
            }
        }
    },
});

app.mount("#game");