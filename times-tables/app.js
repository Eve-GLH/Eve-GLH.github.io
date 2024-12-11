const app = new Vue ({
    el: '#app',
    data: {
        num1: 5,
        num2: 5,
        warningClass: 'warning',
        validClass: 'valid',
        isValid: true,
        boxesClass: 'number-box',
        sharedNumbers: []
    },
    computed: {
        multipliers() {
            if (!this.isValid) return;
            const results = [];
            for (let i=1; i <= this.num2; i++){
                results.push({
                    m: i,
                    total: this.num1 * i
                });
            }
            return results;
        },
        createNumbers() {
            const allNumbers = [];
            for (let i=1; i<= 100; i++){
                allNumbers.push({
                    box: i
                })
            }
            return allNumbers;
        }
    },
    methods: {
        
        findSharedNumbers: function() {
            const results = this.multipliers;
            const allNumbers = this.createNumbers;
            const resultTotals = results.map(r => r.total);
            this.sharedNumbers = allNumbers.filter(num => resultTotals.includes(num.box)).map(num => num.box);
        },
        isValidFunc: function() {
            if (this.num1 >= 1 && this.num1 <= 12 && this.num2 >= 1 && this.num2 <= 12) {
                this.isValid = true;
            } else {
                this.isValid = false;
            }
            this.findSharedNumbers();
        }
    },
    watch: {
        num1(value) {
            this.isValidFunc();
        },
        num2(value) {
            this.isValidFunc();
        }
    },
    mounted() {
        this.findSharedNumbers();
    }
})