const db=require("../../db/config")
const logger=require("../../utils/logger");
function Variant ({
  id,
  name,
  size, 
  model, 
  locationDetailId,
}) {
    this.id=id;
    this.name = name;
    this.size = size;
    this.model = model;
    this.locationDetailId = locationDetailId;
  };
  Variant.prototype.createVariant = async function() {
    const queryPar="INSERT INTO VARIANTS (name,size,model,location_detail_id) VALUES ($1,$2,$3,$4) RETURNING ID,name;"  
    try {
      const rows  = await db.query(queryPar,[this.name,this.size,this.model,this.locationDetailId] );
      return rows; 
      }catch (error) {
        logger.error(error)
      throw error;
  }
}
module.exports=Variant;