const app = new Vue({
    el: '#app',
    data: {
        num1: 0,
        num2: 0,
        operator: '',
        total: 0,
        display: 0
    },
    computed: {
    },
    methods: {
        resetFields: function() {
            this.num1 = 0,
            this.num2 = 0,
            this.operator = '',
            this.total = 0,
            this.display = 0
        },
        setOperator: function(op) {
            this.operator = op;
            this.display = this.num1 + this.operator;
        },
        
        addDigit: function(di) {
            if (this.operator === '') {
                if (this.num1 == 0) {
                    this.num1 = di;
                } else {
                    this.num1 = this.num1.toString() + di.toString();
                }
                this.display = this.num1;
            } else {
                if (this.num2 == 0) {
                    this.num2 = di;
                } else {
                    this.num2 = this.num2.toString() + di.toString();
                }
                this.display = this.num2;
            }
        },
        calcTotal: function() {
            let newValue;
            if (this.operator == '+') {
                newValue = Number(this.num1) + Number(this.num2);
            } else if (this.operator == '-') {
                newValue = Number(this.num1) - Number(this.num2);
            } else if (this.operator == '*') {
                newValue = Number(this.num1) * Number(this.num2);
            } else if (this.operator == '/' && this.num2 === 0) {
                newValue = 'Please don\'t divide by zero!';
            } else if (this.operator == '/') {
                newValue = Number(this.num1) / Number(this.num2);
            } else {
                newValue = 'I do not know how you broke this, but you did.';
            };
            //console.log("num1 = ", this.num1, "num2 = ", this.num2, "operator = ", this.operator, "total = ", this.total);
            this.$set(this, 'total', newValue);
            this.$set(this, 'operator', '');
            this.$set(this, 'display', newValue);
        }
    }
});