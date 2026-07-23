const ToDoApp = new Vue({
    el: '#ToDoApp',
    data: {
        title: 'My To Do List',
        inputTitle: ''
    },
    computed: {

    },
    methods: {
        resetFields: function() {
            this.title = 'My To Do List'
        },
        showEdit: function() {
            let titleInput = document.getElementById("TitleEdit");
            if (titleInput.style.display === "none") {
                titleInput.style.display = "block";
            } else {
                titleInput.style.display = "none";
            }
        },
        submitTitle: function() {
            if (this.inputTitle.length < 3) {
                this.title = "My To Do List"
            } else {
                this.title = this.inputTitle;
            }
        }
    }
});