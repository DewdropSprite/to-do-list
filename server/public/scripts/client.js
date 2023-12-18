console.log('JS is sourced!');
const newTask =[
                {id: " ",
                text: " ",
                isComplete: " "}]


function onReady() {
    getHandler();

}

function submitTaskButton(event) {
    event.preventDefault();
    const taskData = document.getElementById("textInput").value;
    console.log("added task:", taskData);
    const newTask = { id: " ", text: taskData, iscomplete: false }
    document.getElementById("textInput").value = "";

    postHandler(newTask);
    getHandler();
}

// DELETE button deletes a task from the DOM and database
function deleteButton(event) {
    event.preventDefault();
    //console.log("delete event incoming", event.target)
    let taskId = event.target.closest("tr").dataset.id;

    axios
        .delete(`/todos/${taskId}`)
        .then(() => {
            console.log("task is deleted", taskId);
            getHandler();
        })
        .catch((error) => {
            console.log("could not delete", error)
        })
}

// POST request - send data TO the server taskData = id, text, isComplete
function postHandler(taskData) {
    axios
        .post("/todos", taskData)
        .then((response) => {
            console.log("in postHandler")
            getHandler()
        })
        .catch((error) => {
            console.log("error in POST", error)
        })
}

//GET handler -- server responds with sample data and then client logs in console.
function getHandler() {
    console.log("in gethandler")

    //axios - used to call to the server to GET the task data
    axios
        .get("/todos")
        .then((response) => {
            console.log("GET response", response.data)
            renderTasks(response.data)
        })
        .catch((error) => {
            console.log("error", error);
        })
}

//PUT handler -- updates resources on server then server processes the request, updates the resource and sends response back to client
function putHandler(event) {
    event.preventDefault();
    let taskId = event.target.closest("tr").dataset.id

    let serverValue = event.target.closest("tr").dataset.isComplete === "true";
    console.log("is complete:", serverValue)


    axios
        .put(`/todos/${taskId}`, { isComplete: serverValue })
        .then(() => {
            console.log("task is complete", taskId)
            getHandler();
        })
        .catch((error) => {
            console.log("error in put", error)
        })
}

//RENDER -- response made to the client and displayed in the browser (DOM)
function renderTasks(tasks) {
    let viewTasks = document.getElementById("viewTasks");

    viewTasks.innerHTML = "";
    for (let item of tasks) {
        viewTasks.innerHTML += `
       <tr data-id="${item.id} data-text="${item.text} data-iscomplete= ${item.isComplete} data-testid="toDoItem"> 
        <td>${item.id}</td>
        <td>${item.text}
        <td>${item.isComplete}
        <td><button onclick="putHandler(event)">Mark Complete</button></td>
        <td><button onclick="deleteButton(event)">Delete</button></td>
        </tr>`
    };
}
onReady();

{/* <th> Task Id</th>
<th data-testid="toDoItem">Task</th>
<th data-testid="toDoItem">Complete?</th>
<th> Mark Complete </th>
<th data-testid="toDoItem">Delete Task</th> */}