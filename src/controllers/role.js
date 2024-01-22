


const User=require('../persistence/user/user')
const Role=require('../persistence/role/role')
const logger = require('../utils/logger');
const extractError=require('../utils/error')
const rest=require('../utils/rest');

exports.assignRole=async (req, res,next)=>{
        try{
                const{ role,id,permissions }=req.body;
                const user = new User({id,role,permissions});
                const resultUser= await user.findUserByIdAndUpdateRole()
                if(!resultUser.rows[0].id){
                      return           
                }else{
                        data=resultUser.rows[0].id
                }

                
        }catch(err){
              logger.error(err);
              extractError.Db_Error(err).then(
                next(err)
             ) 
        }
     
        rest.SuccessResponseJson(res,"",data,201);   
     
}
exports.read=async (req,res,next)=>{

        try{
                const result=await Role.getRoles()
                 if(result){
                         data=result}
                       

        }catch(err){
                logger.error(err);
              next(err)
        }
        rest.SuccessResponseJson(res,"",data,200); 
}