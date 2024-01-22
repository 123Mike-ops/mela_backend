const db=require("../../db/config")
const logger=require("../../utils/logger");
function LocationDetail ({
  id,
  subcity,
  woreda,
  village,
  locationId
}) {
    this.id=id;
    this.subcity = subcity;
    this.woreda=woreda;
    this.village=village;
    this.locationId=locationId;
  };
  LocationDetail.prototype.createLocationDetail = async function() {
    const queryPar=`INSERT INTO "locationDetails" (subcity,woreda,village,location_id) VALUES ($1,$2,$3,$4) RETURNING ID,subcity;`  
    try {
      const rows  = await db.query(queryPar,[this.subcity,this.woreda,this.village,this.locationId] );
      return rows; 
      }catch (error) {
        logger.error(error)
      throw error;
  }
}
module.exports=LocationDetail;