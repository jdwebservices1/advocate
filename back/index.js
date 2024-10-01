const express = require('express')
const app = express()
const port = 3001
const mongoDB = require("./db")
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
var path = require('path');
const { job } = require('./cron');
mongoDB();

// Set maximum payload size limit
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

job.start(); 

// Start the cron job
// app.use((req,res,next)=>{
//   // res.setHeader("Access-Control-Allow-Origin","https://grit.homes");
//   // res.setHeader("Access-Control-Allow-Origin","https://mycabinets.vercel.app");
//   res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// })

app.use((req, res, next) => {
  // res.setHeader("Access-Control-Allow-Origin", "https://restro-wbno.vercel.app");
  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  const corsWhitelist = [
    "http://localhost:5173",
    "https://khmc.vercel.app",
];
if (corsWhitelist.indexOf(req.headers.origin) !== -1) {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Origin, X-Requested-With, Accept");
}
  // res.setHeader("Access-Control-Allow-Origin", "* , https://restro-wbno.vercel.app");
  // res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  // res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Origin, X-Requested-With, Accept");
  next();
});

// app.use((req, res, next) => {
//   // Allow multiple domains
//   const allowedOrigins = [
//     "http://localhost:3000",
//     "https://mycabinets.vercel.app",
//   ];

//   const origin = req.headers.origin;

//   if (allowedOrigins.includes(origin)) {
//     res.setHeader("Access-Control-Allow-Origin", origin);
//   }

//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );

//   next();
// });


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json())
app.use('/api', require("./Routes/ApiRoutes"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
