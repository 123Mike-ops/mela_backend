const express=require('express')
const authRoute=require('./src/routes/auth-route')
const userRoute=require('./src/routes/user-route')
const roleRoute=require('./src/routes/role-route')
const itemRoute=require('./src/routes/item-route')
const locationRoute=require('./src/routes/location-route')
const bodyparser=require('body-parser');
const Cors=require('cors')
const logger = require('./src/utils/logger');
const errorHandler=require('./src/middlewares/errorhandler');
const expressPinoLogger = require('express-pino-logger');


//swagger

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    info: {
      title: "Mela Application",
      version: "1.0.0",
      description: "API for Mela application",
    },
  },
  apis: ['./src/routes/*.js'], // Path to the API routes folder
};

const specs = swaggerJsdoc(options);





const app=express();

const loggerMidlleware = expressPinoLogger({
    logger: logger,
    autoLogging: true,
  });
  
app.use(loggerMidlleware);  



app.use(Cors());
    app.use(express.json());
    app.use(bodyparser.json());
    app.use((req,res,next)=>{
        req.requestTime=new Date().toISOString();
        next();
    });
    app.use('/v1/auth',authRoute);
    app.use('/v1/user',userRoute);
    app.use('/v1/role',roleRoute);
    app.use('/v1/item',itemRoute);
    app.use('/v1/location',locationRoute);

    app.use(errorHandler
        ); //after long effort i move middleware call to bottom and fix my error 

        app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
module.exports=app;

