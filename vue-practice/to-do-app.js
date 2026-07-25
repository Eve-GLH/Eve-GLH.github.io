const ToDoApp = new Vue({
    el: '#ToDoApp',
    data: {
        title: 'My To Do List',
        inputTitle: '',
        toDoBody: ([{
            text: '',
            done: false
        }]),
        NewToDo: '',
    },
    computed: {

    },
    methods: {
        resetFields: function() {
            this.title = 'My To Do List'
        },
        showEdit: function() {
            let writeTitle = document.getElementById("TitleEdit");
            if (writeTitle.style.display === "none") {
                writeTitle.style.display = "block";
            } else {
                writeTitle.style.display = "none";
            }
        },
        submitTitle: function() {
            let writeTitle = document.getElementById("TitleEdit");
            if (this.inputTitle.length < 3) {
                this.title = "My To Do List"
            } else {
                this.title = this.inputTitle;
            }
            writeTitle.style.display = "none";
        },
        SubmitNew: function() {
            let NewToDoText = this.NewToDo;
            console.log((NewToDoText.length));
            if (NewToDoText.length > 0) {
                this.toDoBody.text = NewToDoText;
                console.log('added item: ' + NewToDoText);
                this.toDoBody.done = true;
                console.log('done: ' + this.toDoBody.done);
                
            } else {
                console.log('No Text Detected');
            }
        }
    }
});