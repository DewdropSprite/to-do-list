const router = require('express').Router();
const pool = require('../modules/pool');

//SELECT (aka GET)
router.get('/', (req, res) => {
    //declare queryText - select ALL task data
    const queryText = `SELECT * FROM "todos"
                        ORDER BY "id";`
    //send query - Send SQL text with pool send from DB to client
    pool.query(queryText)

        //send back results.rows
        .then((result) => {
            res.send(result.rows)
        })
        .catch((error) => {
            console.log("taskRouter.get is not working", error)
            res.sendStatus(500);
        })
})

//Insert (aka POST) task to send data to database

router.post('/', (req, res) => {
    //Store values in array for parameterization !! THIS IS A REQUIREMENT 
    //new task will be req.body
    const incomingTask = [req.body.text];
    console.log("incoming text", incomingTask[0])


    //add new task to table on DOM
    const queryText =
        `INSERT INTO "todos" ("text")
        VALUES($1);`

    //send queryText and queryParams to DB
    pool.query(queryText, incomingTask)

        //then send created status
        .then((result) => {
            res.sendStatus(201)
        })
        .catch((error) => {
            console.log("Theres an error in router.post", error)
            res.sendStatus(500);
        })
    //set queryParams for queryText

    // const queryParams = [incomingTask.text, completedTask]
})

// DELETE
router.delete('/:id', (req, res) => {
    // get id param
    let taskComplete = req.params.id
    console.log("Deleted task:", taskComplete);

    // queryText for DELETE
    const queryText = `DELETE FROM "todos" 
                        WHERE "id"=$1;`
    // queryParams for DELETE because can't use pool.query without the array
    const queryParams = [taskComplete]

    // send DELETE query to DB
    pool.query(queryText, queryParams)

        // then sendStatus
        .then((result) => {
            console.log("send status");
            res.sendStatus(201)
        }).catch((error) => {
            res.sendStatus(500)
            console.log("error in taskRouter.delete", error);
        })
})


//PUT
//When put request is made, use task id to UPDATE "isComplete" to true
router.put('/:id', (req, res) => {
    // create queryParam to take in taskID and make an array
    let queryParams = [req.params.id]

    //declare query text for UPDATE
    const queryText = `
    UPDATE "todos"
    SET "isComplete" = not "isComplete"
    WHERE "id" = $1;
    `
    pool.query(queryText, queryParams)
        //then send ok status
        .then(() => {
            res.sendStatus(200)
        })
        .catch((error) => {
            res.send(500)
            console.log("there's an error in taskRouter.put:", error)
        })
})







module.exports = router;
