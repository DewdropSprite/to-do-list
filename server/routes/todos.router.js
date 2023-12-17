const taskRouter = require('express').Router();
const pool = require('../modules/pool');

//GET

taskRouter.get('/', (req, res) => {
    //declare queryText - select ALL task data
    const queryText = `SELECT * FROM "todos";`

    //send query
    pool
        .query(queryText)

        //send back results.rows
        .then((result) => {
            res.send(result.rows)
        })
        .catch((error) => {
            console.log("taskRouter.get is not working", error)
        })
})


//POST

taskRouter
.post('/', (req, res) => {
    //new task will be req.body
    console.log("req.body:", req.body);
    let incomingTask = req.body
    // if (incomingTask.isComplete === "true") {
    //     completedTask = "Complete"
    // }
    // else {
    //     completedTask = "Not Complete"
    // }
    // console.log("new task:", incomingTask);

    //add new task to table on DOM
    const queryText =
        `INSERT INTO "todos" ("text","isComplete")
VALUES($1, $2);`

    //set queryParams for queryText

    const queryParams = [incomingTask.text, incomingTask.isComplete]

    //send queryText and queryParams to DB
    pool
        .query(queryText, queryParams)

        //then send created status
        .then((result) => {
            res.sendStatus(201)
        })
        .catch((error) => {
            console.log("Theres an error in taskRouter.post", error)
        })
})

//PUT
//When put request is made, use task id to UPDATE "isComplete" to true
taskRouter.put('/:id', (req,res)=>{
    //get the task ID
    let taskId = req.params.id
    console.log("task id:", taskId)
   
    let isComplete = req.body.isComplete
    console.log("Is the task complete?", isComplete)

    //declare query text for UPDATE
    let queryText;
    const queryParams = [taskId]
    
    if(isComplete === true){
        queryText = `
        UPDATE "todos" SET "isComplete" = false WHERE "id" = $1;`;}
        else{
            queryText = `UPDATE "todos" SET "isComplete" = true WHERE "id" = $1;`;}
        
    
    pool.query(queryText, queryParams)

    //then send ok status
    .then(()=>{
        res.sendStatus(200)
    })
    .catch((error)=>{
        console.log("there's an error in taskRouter.put:", error)
    })
})


// DELETE
taskRouter.delete('/:id', (req, res) => {
    // get id param
    let taskComplete = req.params.id
    console.log("Deleted task:", taskComplete);

    // queryText for DELETE
    const queryText = `DELETE FROM "todos" WHERE "id"=$1;`
    // queryParams for DELETE
    const queryParams = [taskComplete]

    // send DELETE query to DB
    pool.query(queryText, queryParams)

    // then sendStatus
    .then(() => {
        console.log("send status");
        res.sendStatus(200)
    }) .catch((error) => {
        console.log("error in taskRouter.delete", error);
    })
})





module.exports = taskRouter;
