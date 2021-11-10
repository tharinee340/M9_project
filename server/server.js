const express = require('express');

const bodyParser = require('body-parser');
const cors = require('cors');
const indexRouter = require('./router.js');
const cookieParser = require('cookie-parser')
const app = express();

app.use(express.json());

app.use(cookieParser())

app.use(bodyParser.json());
 
app.use(bodyParser.urlencoded({
    extended: true
}));
 
app.use(cors());

app.use('/api', indexRouter);

// Handling Errors
app.use((err, req, res, next) => {
    // console.log(err);
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
      message: err.message,
    });
});

app.listen(5000,() => console.log('Server is running on port 5000'));