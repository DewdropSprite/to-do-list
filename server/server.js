const express = require('express');
const app = express();
const PORT = process.env.PORT || 5001;
const todos = require('./routes/todos.router.js');
const bodyParser = require('body-parser');


// Do not modify this!
if (process.env.NODE_ENV == 'test') {
  PORT = 5002;
}

app.use(express.static('./server/public'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//ROUTE
app.use('/todos', todos);

app.listen(PORT, () => {
  console.log('server running on: ', PORT);
});
