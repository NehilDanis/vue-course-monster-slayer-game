function calculateAttackForce(min, max) {
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
            currentRound: 0
        };
    },
    computed: {
        monsterBarStyles() {
            return { width: this.monsterHealth + '%' }
        },
        playerBarStyles() {
            return { width: this.playerHealth + '%' }
        },
        mayUseSpecialAttack() {
            return this.currentRound % 3 !== 0;
        }
    },
    methods: {
        attackMonster() {
            this.currentRound += 1;
            const attachValue = calculateAttackForce(5, 12);
            this.monsterHealth -= attachValue;
            this.attackPlayer();
        },
        attackPlayer() {
            const attachValue = calculateAttackForce(8, 15);
            this.playerHealth -= attachValue;
        },
        specialAttackMonster() {
            this.currentRound++;
            const attachValue = calculateAttackForce(10, 25);
            this.monsterHealth -= attachValue;
            this.attackPlayer();
        }
    }

});

app.mount('#game');
