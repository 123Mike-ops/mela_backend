const db=require("../../db/config")
const logger=require("../../utils/logger");
function Location ({
  id,
  locationName,
}) {
    this.id=id;
    this.locationName = locationName;
  };
  Location.prototype.create = async function() {
    const queryPar="INSERT INTO LOCATIONS (name) VALUES ($1) RETURNING ID,name;"  
    try {
      const rows  = await db.query(queryPar,[this.locationName] );
      return rows; 
      }catch (error) {
        logger.error(error)
      throw error;
  }
}
module.exports=Location;