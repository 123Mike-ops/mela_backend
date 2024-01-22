
const Item=require('../persistence/item/item')
const Location=require('../persistence/location/location')
const LocationDetail=require('../persistence/locationDetail/locationDetail')
const Variant=require('../persistence/variant/variant')

const logger = require('../utils/logger');
const extractError=require('../utils/error');
const rest=require('../utils/rest');
const MetaData=require('../utils/rest');

exports.create=async(req,res,next)=>{
  var resultItem;    
  var data;
    try{
      const userId=req.user.rows[0].id;
      if (!userId){
        rest.FailureResponseJson(res,"Missing required parameters or fields",400); 
       }
        const{locationId,subcity,woreda,village,variantName,size,model,itemName,itemType}=req.body;
      const locationDetail=new LocationDetail({subcity,woreda,village,locationId})
      const resultLocation=locationDetail.createLocationDetail()
      
      if (resultLocation.rows[0]){
        const variant=new Variant({variantName,size,model})
        const resultVariant=variant.createVariant()
                if (resultVariant.rows[0]){
                  const item=new Item({itemName,itemType,userId})
                  const resultItem=item.createItem()
                    if(resultItem.rows[0]){
                      data=resultItem.rows[0];
                   
                    }
                }
      }


      }catch(err){
            logger.error(err);

            extractError.Db_Error(err).then(
            next(err)
      ) 
      }

       const metaData=Object.create(rest.MetaData)
       
      //     metaData.Page=2; set meta data like this

          rest.SuccessResponseJson(res,metaData,data,200);   
}