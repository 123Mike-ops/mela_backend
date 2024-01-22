
const express=require('express')
const {promisify}=require('util')
const crypto=require('crypto')
const jwt=require('jsonwebtoken');
const joi=require('joi');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const User=require('../persistence/user/user')
const RefreshToken=require('../persistence/user/token')

const {OAuth2Client}=require('google-auth-library');
const { userData } = require('../persistence/user/user');

const client=new OAuth2Client("1085439747019-ug7j4u6t08r99uqrbm3bg2r5d0t91nog.apps.googleusercontent.com");
const logger = require('../utils/logger');
const validation = require('../utils/validation')
const extractError=require('../utils/error')

const mailgun = require("mailgun-js");
const DOMAIN = 'sandboxb9332d4bbbb54295bba706deed2b1dd8.mailgun.org';
const mg = mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN});


const signToken=(id)=>{
  
   return jwt.sign({id:id,iat:Date.now()},'my-secrete-of-long-character-ker',{expiresIn:'5d'})
}

// Generate a new refresh token
function generateRefreshToken(id) {
   try{
      const token = jwt.sign({id:id,iat:Date.now()},'mela-refresh-token-secret',{expiresIn:'100d'})
      const tokenRefresh =new RefreshToken({token});
      const result= tokenRefresh.createRefreshToken();
      return tokenRefresh;
   }catch(err){
      logger.error(err)
   }
 
}


exports.refreshToken=async (req, res)=>{
  const refreshToken = req.body.token;

  if (!refreshToken) return res.sendStatus(401);
  jwt.verify(refreshToken, 'mela-refresh-token-secret', (err, decoded) => {
  
    if (err) return res.sendStatus(403);
    if (refreshToken) {
      const accessToken = signToken({ id: decoded.id });
      res.json({ accessToken: accessToken });
    } else {
      return res.sendStatus(403);
    }
  });
}

exports.signup=async (req,res,next)=>{
         try {  
            let {firstname,lastname,email,phone,password}=req.body;
            const user = new User({firstname,lastname,email,phone,password});
            const saltRounds = 10; 
           const hash=bcrypt.hashSync(user.password, saltRounds);
            if (hash){
               user.password=hash;
            }
            const result= await user.createUser()
            res.status(201).json({
               data:result.rows[0]
               });  
            } catch (error) {
               extractError.Db_Error(error).then(
                  next(error)
               )                        
           }
}

exports.login=async (req,res,next)=>{

      const {email,password}=req.body;

      if(!email||!password){
         return res.json({message:"please enter valid credentials"});
      }

      const user = new User({email});
      const resultUser= await user.findUserByEmail()

      bcrypt.compare(password, resultUser.rows[0].password, function(err, result) {
      if (err) {
         return res.status(400).json({message:"invalid credentials"})  
      } else if (result) {

      const token=signToken(resultUser.rows[0].id);
      const refreshToken=generateRefreshToken(resultUser.rows[0].id);
   
      res.status(200).json({
         token,
         user:{
            email:resultUser.rows[0].email,
            id:resultUser.rows[0].id,
            firstname:resultUser.rows[0].firstname
         },
         refreshToken
         });
         
      } else {
         return res.status(400).json({message:"invalid credentials"})
      }
   });  

}


exports.protect=async (req,res,next)=>{
    var token=""

    //1)check if there is a token
   try{
 
       if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
             token= req.headers.authorization.split(' ')[1];
                }

       if(!token){
          return next(new Error("you are not logged in to access"),401);
       }
 
    //2)verification token
    const decoded = await jwt.verify(token, 'my-secrete-of-long-character-ker');
    
  
    //3)check if the user still exists
    const id=decoded.id;
    const user = new User({id});
    const currentUser= await user.findUserById()
    

      if(!currentUser.rows[0]){
         return  res.status(400).json({status:"fail",message:"no user is belonging to this token"});
       }
 
    //4)check if the user changes password after the token was issued
 
    if(currentUser.rows[0].passwordChangedAt > decoded.iat){
       
       return next(res.json({status:"fail",message:"user changed password! Login Again!"}));
 
    }

    req.user=currentUser; //gives users info for next middle ware after protect lalew middlware yestewal
  
    next();
 
   }catch(err){
      console.log(err);
   }   
 
 }

 exports.restrictTo= (...roles)=>{
     
     return (req,res,next)=>{

            if(! roles.includes(req.user.roles)){

                return next(res.json({message:"you didnt have permission to delete events."}));
            }

            next();
        }

     }

exports.forgotPassword= async (req,res,next)=>{
           try{
            //1) find the user based on posted email  
            const {email}=req.body;
            const user = new User({email});
            const resultUser= await user.findUserByEmail()
            if(!resultUser){
               return res.status(400).json({msg:""});
            }

            //2)Generate rest token and send 
            const passwordResetToken = crypto.randomBytes(20).toString('hex');
            const now = new Date();
            now.setHours(now.getHours() + 1); 
            const passwordResetExpires=now;
            const id=resultUser.rows[0].id;

            //3)store pass reset token
            const  userUpdate= new User({passwordResetToken,passwordResetExpires,id});
            const resultUpdate=await userUpdate.updateUserResetTokenById()
       


            //4)Send the reset token with email
          
                const resetURL=`${req.protocol}://${req.get('host')}/api/user/resetpassword/${passwordResetToken}`;

                const message=`forgot your password ? don't bother ,submit your new password with patch request and passwordConfirm to ${resetURL} `
            
            try{
                 const to =resultUser.rows[0].email;
                  const data = {
                     from: 'mikafb523@gmail.com',
                     to: to,
                     subject: 'Password Reset Request',
                     text: message
                   };
                   
                   mg.messages().send(data, function (error, body) {
                     console.log(body);
                   });
           

                res.json({
                   status:'success',
                   message:'Token has been sent to your mail'
                });
               }catch(err){
                  console.log(err)
                  // user.createPasswordResetToken=undefined;
                  // user.passwordResetExpires=undefined;
                  // await user.save({validateBeforeSave:false});
                  return next(res.json({message:"error happens when sending email"}));
               }
            
         
         }catch(err){
           console.log(err);
         }

    
}

exports.resetPassword=async(req,res,next)=>{

   let passwordResetToken=req.param('token');
   let passwordResetExpires=Date.now();
   
   //1)get the user based on token 
 
   
      const  userFindByResetToken= new User({passwordResetToken,passwordResetExpires});
      const resultUser=await userFindByResetToken.findUserByResetToken()
   //2) if the token not expired and there is a user set new password

        if(!resultUser.rows[0].email){
           return next(res.json({status:"fail",message:"Token is invalid or expires out..."}));
        }

        const id=resultUser.rows[0].id;
        const saltRounds = 10; 
        const hash=bcrypt.hashSync(req.body.password, saltRounds);
           if (!hash){
            throw new Error("unable to hash use password");
           }
         password=hash;
         passwordResetToken=undefined;
         passwordResetExpires=undefined;

        //3)store pass reset token
        const  userUpdate= new User({password,passwordResetToken,passwordResetExpires,id});
        const resultUpdate=await userUpdate.updateUserPasswordByResetToken()


        res.status(200).json({
           data:"sucussfuly updated your password !"
        });      



}

exports.googleLogin=async (req,res,next)=>{
            const {tokenId}=req.body;
            console.log(tokenId);
            
               client.verifyIdToken({idToken:tokenId, audience: "1085439747019-ug7j4u6t08r99uqrbm3bg2r5d0t91nog.apps.googleusercontent.com"}).then(
                  response=>{ 
                     const {email_verified,email,name}=response.payload;
                     if(email_verified){
                      User.findOne({email}).exec((err,user)=>{
                           if(err){
                              res.status(400).json({error:"something went wrong"});
                           }
                           else  {
                              if(user){
                                 const token=signToken(user._id);
                                       res.status(201).json({token,user});
                              }else {
                                 let password=email+'my-secrete-of-long-character-ker'
                                 let passwordConfirm=email+'my-secrete-of-long-character-ker'
                                 const user=new User({
                                    name,email,password,passwordConfirm
                                  });
                                  
                                            user.save();

                                          const wallet=new Wallet({
                                             walletNo:user.email,
                                             balance:1000,
                                             createdAt:Date.now()
                                          })
                                           wallet.save();
                                          const token=signToken(user._id);    
                                          res.status(201).json({
                                             token,user
                                             });
                              }
                           }
                        })
                     }

                     console.log(response.payload);
                  } 
               )
}

 