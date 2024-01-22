const db=require("../../db/config")
const logger=require("../../utils/logger");
function RefreshToken ({
  id,
 token

}) {
     this.id=id;
   this.token=token;
  
};
RefreshToken.prototype.createRefreshToken = async function() {
    const queryPar="INSERT INTO tokens (token) VALUES ($1) RETURNING ID;"  
    try {
      const rows  = await db.query(queryPar,[this.token] );
      return rows; 
      }catch (error) {
        logger.error(error)
      throw error;
  }
  
  }
  RefreshToken.prototype.findToken = async function() {
     const queryPar="SELECT * FROM TOKENS WHERE token = $1;"
     try {
      const rows  = await db.query(queryPar,[this.token]);
      return rows;
     }catch(error){
      logger.error(error)
      throw error;
     }
  }
  module.exports=RefreshToken;