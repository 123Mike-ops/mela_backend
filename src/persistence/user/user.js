const db=require("../../db/config")
const logger=require("../../utils/logger");
function User ({
  id,
  firstname,
  lastname, 
  email, 
  phone,
  password, 
  role,
  permissions,
  passwordResetToken,
  passwordResetExpires

}) {
     this.id=id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.phone = phone;
    this.password = password;
    this.role = role;
    this.permissions = permissions;
    this.passwordResetToken = passwordResetToken;
    this.passwordResetExpires= passwordResetExpires;
  
};

User.prototype.createUser = async function() {
  const queryPar="INSERT INTO USERS (firstname,lastname,email,phone,password) VALUES ($1,$2,$3,$4,$5) RETURNING ID,firstname,lastname;"  
  try {
    const rows  = await db.query(queryPar,[this.firstname,this.lastname,this.email,this.phone,this.password] );
    return rows; 
    }catch (error) {
      logger.error(error)
    throw error;
}

}
User.prototype.findUserByEmail = async function() {
   const queryPar="SELECT * FROM USERS WHERE email = $1;"
   try {
    const rows  = await db.query(queryPar,[this.email]);
    return rows;
   }catch(error){
    logger.error(error)
    throw error;
   }
}

User.prototype.findUsers= async function(filter, sort, page, limit) {
      // Construct the SQL query based on the received parameters
      let query = `SELECT id,firstname,lastname,email,phone FROM USERS`;
      let params = [];
      if (filter) {
        query += " WHERE " + filter;
        // params.push(...filter.split(","));
      }
      if (sort) {
        query += " ORDER BY " + sort;
      }
    
      if (page && limit) {
        const offset = (page - 1) * limit;
        query += " LIMIT $1 OFFSET $2";
        params.push(limit, offset);
      }
  // const queryPar="SELECT id,firstname,lastname,email,phone FROM USERS ORDER BY id DESC;"
  try { 
   const rows  = await db.query(query,params);
   
   return rows;
  }catch(error){
   logger.error(error)
   throw error;
  }
}

User.prototype.findUserById = async function() {



  const queryPar="SELECT id,firstname,lastname,email,phone FROM USERS WHERE id = $1;"
  try {
   const rows  = await db.query(queryPar,[this.id]);
   return rows;
  }catch(error){
   logger.error(error)
   throw error;
  }
}
User.prototype.findUserByIdAndUpdateRole = async function() {
  
  const queryPar=`UPDATE USERS SET "role" = $1 , "permissions" = $2 WHERE id = $3 RETURNING ID,role;  `
  try {
   const rows  = await db.query(queryPar,[this.role,this.permissions,this.id]);
   return rows;
  }catch(error){
    logger.error(error)

 
   throw error;
  }
}

User.prototype.findUserById = async function() {

  const queryPar=`SELECT * FROM USERS WHERE id = $1;`
  try {
   const rows  = await db.query(queryPar,[this.id]);
   return rows;
  }catch(error){
   logger.error(error)
   throw error;
  }
}

User.prototype.findUserByIdAndUpdate = async function() {

  const queryPar=`UPDATE USERS SET "firstname" = $1 , "lastname" = $2 , "phone" = $3 WHERE id = $4 RETURNING ID;`
  try {
   const rows  = await db.query(queryPar,[this.firstname,this.lastname,this.phone,this.id]);
   return rows;
  }catch(error){
   logger.error(error)
   throw error;
  }
}
User.prototype.updateUserResetTokenById = async function() {
  const queryPar=`UPDATE USERS SET "passwordResetToken" = $1 , "passwordResetExpires" = $2 WHERE id = $3; `
  try {
   const rows  = await db.query(queryPar,[this.passwordResetToken,this.passwordResetExpires,this.id]);

   return rows;
  }catch(error){
   logger.error(error)
   throw error;
  }
}
User.prototype.findUserByResetToken = async function() {
  
  const queryPar=`SELECT * FROM USERS WHERE "passwordResetToken" = $1 AND "passwordResetExpires" > $2;`
  try {
   const rows  = await db.query(queryPar,[this.passwordResetToken,this.passwordResetExpires]);
   return rows;
  }catch(error){
   logger.error(error)
   throw error;
  }
}

User.prototype.updateUserPasswordByResetToken = async function() {
  const queryPar=`UPDATE USERS SET "passwordResetToken" = $1 , "passwordResetExpires" = $2 ,password= $3 ,passwordChangedAt=$4 WHERE id = $5; `
  try {
   const rows  = await db.query(queryPar,[this.passwordResetToken,this.passwordResetExpires,this.password,Date.now(),this.id]);

   return rows;
  }catch(error){
   logger.error(error)
   throw error;
  }
}

User.prototype.updateUserRoleById= async function() {
  const queryPar=`UPDATE USERS SET "permissions" = $1 WHERE id = $5; `
  try {
   const rows  = await db.query(queryPar,[this.passwordResetToken,this.passwordResetExpires,this.password,Date.now(),this.id]);

   return rows;
  }catch(error){
   logger.error(error)
   throw error;
  }
}

module.exports=User;
