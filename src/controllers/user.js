
const User=require('../persistence/user/user')
const logger = require('../utils/logger');
const extractError=require('../utils/error')
const rest=require('../utils/rest');
const MetaData=require('../utils/rest');

exports.updateUser=async(req,res,next)=>{
  var resultUser;    
  var data;
    try{
        const{firstname,lastname,phone}=req.body;
        const id=req.user.rows[0].id;
        if (!id){
            rest.FailureResponseJson(res,"Missing required parameters or fields",400); 
      }
        const user = new User({id,firstname,lastname,phone});
        resultUser= await user.findUserByIdAndUpdate()
        

      }catch(err){
            logger.error(err);
            extractError.Db_Error(err).then(
            next(err)
      ) 
      }

       const metaData=Object.create(rest.MetaData)
       if(resultUser.rows[0]){
            data=resultUser.rows[0];
       }else{
            data=null
       }
       
      //     metaData.Page=2; set meta data like this

          rest.SuccessResponseJson(res,metaData,data,200);   
}
exports.getUser=async(req,res,next)=>{
      var resultUser;
      var data;
      try{
                             
            const id=req.params.id;
            if (!id){
                  rest.FailureResponseJson(res,"Missing required parameters or fields",400); 
            }
            const user = new User({id});
            resultUser= await user.findUserById()
            
    
          }catch(err){
                logger.error(err);
                extractError.Db_Error(err).then(
                next(err)
          ) 
          }
          if(resultUser.rows[0]){
            data=resultUser.rows[0]
          }else{
            data=null
          }
          
          const metaData=Object.create(rest.MetaData)

      //     metaData.Page=2; set meta data like this

          rest.SuccessResponseJson(res,metaData,data,200);
}

exports.getUsers=async(req,res,next)=>{
  var resultUser;
  var data;
  const { filter, sort, page, limit } = req.query;
  try{
    const user=new User({});
    resultUser= await user.findUsers(filter, sort, page, limit)
      }catch(err){
            logger.error(err);
            extractError.Db_Error(err).then(
            next(err)
      ) 
      }
      if(resultUser){
        data=resultUser.rows
      }else{
        data=null
      }
      
      const metaData=Object.create(rest.MetaData)
      metaData.Page=page;
      metaData.PerPage=limit;
      metaData.Sort=sort;
      metaData.Filter=filter;
      

  //     metaData.Page=2; set meta data like this

      rest.SuccessResponseJson(res,metaData,data,200);
}