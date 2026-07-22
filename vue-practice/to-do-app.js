const ToDoApp = new Vue({
    el: '#ToDoApp',
    data: {
        title: 'My To Do List'
    },
    conputed: {

    },
    methods: {
        resetFields: function() {
            this.title = 'My To Do List'
        }
    }
});