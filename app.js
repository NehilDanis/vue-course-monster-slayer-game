function calculateAttackForce(min, max) {
    if(max <= min) {
        return 0;
    }
    return Math.floor(Math.random() * (max- min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100, 
            monsterHealth: 100
        };
    },
    methods: {
        attackMonster() {
            const attachValue = calculateAttackForce(5, 12);
            this.monsterHealth -= attachValue;
            this.attackPlayer();
        },
        attackPlayer() {
            const attachValue = calculateAttackForce(8, 15);
            this.playerHealth -= attachValue;
        }
    }

});

app.mount('#game');
