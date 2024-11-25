const app = new Vue ({
    el: '#app',
    data: {
        num1: 5,
        num2: 5
    },
    computed: {
        multipliers() {
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
        createTable: function() {
            this.multipliers = [];
            
        }
    },
    mounted() {
        this.createTable();
    }
})