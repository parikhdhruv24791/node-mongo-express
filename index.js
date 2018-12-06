const config = require('./config');
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const app = express();
const bodyParser = require('body-parser');
const router = require('./routes/router');

// require('./logger');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(helmet());

// app.use('/api/docs', express.static('./apidoc'));
let url = '';
if (config.mongo.user && config.mongo.password) {
    url = `mongodb://${config.mongo.username}:${config.mongo.password}@${config.mongo.host}:${config.mongo.port}/${config.mongo.db}`;
} else {
    url = `mongodb://${config.mongo.host}:${config.mongo.port}/${config.mongo.db}`
}
app.use(router);

mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true }, function (error) {
    // Check error in initial connection. There is no 2nd param to the callback.
    if (error) console.log("Error connecting mongo", error)
    else console.log("Mongo Connected");
    // process.exit(1);
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({ error: JSON.stringify(err) });
});


app.listen(config.PORT, (err) => {
    if (err) console.log(err);
    console.log(`Listening on port ${config.PORT}`);
});
