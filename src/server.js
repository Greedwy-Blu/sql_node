const express = require('express');
const  routes =   require('./router/usersRouter');
require('./infra/database/index');
const app = express();

app.use(express.json());
app.use(routes);


app.listen(3333);
