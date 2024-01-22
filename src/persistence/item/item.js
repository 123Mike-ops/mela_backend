const db=require("../../db/config")
const logger=require("../../utils/logger");
function Item ({
  id,
  name,
  itemType, 
  variantId, 
  userId,
}) {
    this.id=id;
    this.name = name;
    this.itemType = itemType;
    this.variantId = variantId;
    this.userId = userId;
  };

  Item.prototype.createItem = async function() {
    const queryPar="INSERT INTO ITEMS (name,itemType,user_id,variant_id) VALUES ($1,$2,$3,$4) RETURNING ID,name;"  
    try {
      const rows  = await db.query(queryPar,[this.name,this.itemType,this.userId,this.variantId] );
      return rows; 
      }catch (error) {
        logger.error(error)
      throw error;
  }
}
module.exports=Item;