console.log('JS is sourced!');

function onReady() {
    getTaskItems()
}

function getTaskItems() {
    console.log("in getTaskItems");
    //axios call to server to GET tasks
    axios
        .get("/todos")
        .then((response) => {
            console.log("GET response:", resonse.data)
            renderTasks(response.data);
        })
        .catch((error) => {
            console.log("Task GET failed")
            console.log(error);
        })
} //end getTaskItems

function submitTaskItem(event) {
    event.preventDefault();
    console.log("in submitTaskItem");

    //input value from input task item field
    let taskToAdd = {};
    taskToAdd.item = document.getElementById("toDoTextInput").value;
  
    console.log("Tasks to add", taskToAdd);

    //axios call to server to POST koalas

    axios({
        method: 'POST',
        url: "/todos",
        data: taskToAdd
    })
        .then((response) => {
            console.log("in POST request", response.data);
            document.getElementById("toDoTextInput").value = "";
            getTaskItems();
        })
        .catch((error) => {
            console.log("POST ERROR!");
            console.log(error);
        })
}

function renderTasks(tasks) {
    const viewTasks = document.getElementById("viewTasks");
    console.log("render Tasks:", tasks);
    viewTasks.innerHTML = "";

    tasks.forEach((task) => {
        viewTasks.innerHTML += `
        <tr>
        <td>${task.item}</td>
        <td><button onClick="taskisComplete(event, true)"> Complete </button></td>
        <td><button onClick="taskIsDeleted(event)">Delete</button></td>
        </tr>
        `;
    })
}

function taskisComplete(event) {
    event.preventDefault();
    let taskId = event.target.closest("tr").dataset.id;

    axios
        .put(`/todos/${taskId}`)
        .then((response) => {
            console.log("Id is Complete!", taskId);
            getTaskItems();
        })
        .catch((error) => {
            console.log("error", error)
        });
}

// function taskIsDeleted(event)
// event.preventDefault();
// console.log("delete event", event.target);

// const taskId = event.target.closest("tr").dataset.id;

// axios
//     .delete(`/todos/${taskId}`)
//     .then((response) => {
//         console.log("task is deleted", taskId);
//         getTaskItems();
//     })
//     .catch((error) => {
//         console.log("Could not delete", error)
//         resizeBy.sendStatus(500);
//     })

onReady();