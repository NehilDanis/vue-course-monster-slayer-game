function getRandomValue(min, max) {
    if (max <= min) {
        return 0;
    }
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null
        };
    },
    computed: {
        monsterBarStyles() {
            if (this.monsterHealth < 0) {
                return { width: '0%' };
            }
            return { width: this.monsterHealth + '%' }
        },
        playerBarStyles() {
            if (this.playerHealth < 0) {
                return { width: '0%' };
            }
            return { width: this.playerHealth + '%' }
        },
        mayUseSpecialAttack() {
            return this.currentRound % 3 !== 0;
        }
    },
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                this.winner = 'draw';
            }
            else if (value <= 0) {
                this.winner = 'monster';
            }
        },
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                this.winner = 'draw';
            }
            else if (value <= 0) {
                this.winner = 'player';
            }
        }

    },
    methods: {
        attackMonster() {
            this.currentRound++;
            const attachValue = getRandomValue(5, 12);
            this.monsterHealth -= attachValue;
            this.attackPlayer();
        },
        attackPlayer() {
            const attachValue = getRandomValue(8, 15);
            this.playerHealth -= attachValue;
        },
        specialAttackMonster() {
            this.currentRound++;
            const attachValue = getRandomValue(10, 25);
            this.monsterHealth -= attachValue;
            this.attackPlayer();
        },
        healPlayer() {
            this.currentRound++;
            const healValue = getRandomValue(8, 20);
            if (this.playerHealth + healValue > 100) {
                this.playerHealth = 100
            }
            else {
                this.playerHealth += healValue;
            }
            this.attackPlayer();
        },
        startNewGame() {
            this.winner = null;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.currentRound = 0;
        },
        surrender() {
            this.winner = 'monster';
        }
    }

});

app.mount('#game');
