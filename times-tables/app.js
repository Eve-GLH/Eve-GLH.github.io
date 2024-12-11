const app = new Vue ({
    el: '#app',
    data: {
        firstNumber: 5,
        secondNumber: 5,
        warningCssClass: 'warning',
        validCssClass: 'valid',
        isInputValid: true,
        numberBoxCssClass: 'number-box',
        sharedNumbersList: []
    },
    computed: {
        multiplicationTable() {
            if (!this.isInputValid) return;
            const results = [];
            for (let number=1; number <= this.secondNumber; number++){
                results.push({
                    m: number,
                    total: this.firstNumber * number
                });
            }
            return results;
        },
        numberBoxes() {
            const allNumbers = [];
            for (let number=1; number<= 100; number++){
                allNumbers.push({
                    box: number
                })
            }
            return allNumbers;
        }
    },
    methods: {
        
        calculateSharedNumbers: function() {
            const results = this.multiplicationTable;
            const allNumbers = this.numberBoxes;
            const resultTotals = results.map(r => r.total);
            this.sharedNumbersList = this.numberBoxes.filter(num => resultTotals.includes(num.box)).map(num => num.box);
        },
        validateInput: function() {
            if (this.firstNumber >= 1 && this.firstNumber <= 12 && this.secondNumber >= 1 && this.secondNumber <= 12) {
                this.isInputValid = true;
            } else {
                this.isInputValid = false;
            }
            this.calculateSharedNumbers();
        }
    },
    watch: {
        firstNumber(value) {
            this.validateInput();
        },
        secondNumber(value) {
            this.isInputValidFunc();
        }
    },
    mounted() {
        this.calculateSharedNumbers();
    }
})