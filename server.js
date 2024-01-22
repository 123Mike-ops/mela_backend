const dotenv=require('dotenv')
const app =require('./app')
const logger = require('./src/utils/logger');


const client=require("./src/db/config")

client.connect(function(err) {
  if (err) throw err;
   
  console.log("database Connected!");
});

const port=process.env.PORT||9000

     logger.info('SERVER STARTED');
     app.listen(port,()=>{console.log(`App lsiten on port ${port}`)})
     







