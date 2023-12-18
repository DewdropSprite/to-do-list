const express = require('express');
const app = express();

const todos = require('./routes/todos.router.js');

const PORT = process.env.PORT || 5001;


// Do not modify this!
if (process.env.NODE_ENV == 'test') {
  PORT = 5002;
}

app.use(express.static('./server/public'));
//express.json = MINIMUM REQUIREMENT FOR AXIOS.. also when testing in postman key and value have to be in ""
app.use(express.json());
app.use(express.urlencoded({extended: true}))

//ROUTE
app.use('/todos', todos);

app.listen(PORT, () => {
  console.log('server running on: ', PORT);
});
