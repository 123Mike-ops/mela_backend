
const Location=require('../persistence/location/location')
const LocationDetail=require('../persistence/locationDetail/locationDetail')


const logger = require('../utils/logger');
const extractError=require('../utils/error');
const rest=require('../utils/rest');
const MetaData=require('../utils/rest');

exports.create=async(req,res,next)=>{
    var resultLocation;    
    var data;
      try{
        const {name}=req.body;
        const locationName=name;
        const location=new Location({locationName})
         resultLocation=await location.create()
        if (resultLocation.rows[0]){
            data=resultLocation.rows[0]
        }
 
      }catch(err){
        logger.error(err);
        extractError.Db_Error(err).then(
        )

      }
      const metaData=Object.create(rest.MetaData)
       
      //     metaData.Page=2; set meta data like this

          rest.SuccessResponseJson(res,metaData,data,200);   
}