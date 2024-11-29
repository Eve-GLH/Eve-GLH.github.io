const app = new Vue ({
    el: '#app',
    data: {
        num1: 5,
        num2: 5,
        warningClass: 'warning',
        validClass: 'valid',
        isValid: true
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
        }
    },
    methods: {
        isValidFunc: function() {
            if (this.num1 >= 1 && this.num1 <= 12 && this.num2 >= 1 && this.num2 <= 12) {
                this.isValid = true;
            } else {
                this.isValid = false;
            }
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
        this.createTable();
    }
})