const express = require('express')

const chalk = require('chalk');
const bodyParser = require("body-parser"); 
const cookieParser = require("cookie-parser")
const cors = require('cors');

const app = express()

// 설정
const config = require("./config/dev");

// 미들웨어 설정
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use('/api/qualEval', require('./routes/qual_eval'));
app.use('/api/expense', require('./routes/expense'));

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,
  {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    dbName: "ALim_CE"
})
.then(() => console.log(chalk.greenBright('MongoDB Atlas connected successfully')))
.catch(err => console.log(chalk.redBright('MongoDB Atlas is not connected, err ocuured : '+err)));

app.get('/', (req, res) => {
  res.send('Hello it`s CE express app!')
})

const port = process.env.PORT||5005

app.listen(port, () => {
  console.log(chalk.green(`Example app listening at http://localhost:${port}`))
})