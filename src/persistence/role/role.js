




  exports.getRoles=async function() {
    const role=[{
        name:"admin",
        permissions:['assignRole','getRoles']
              },{
                name:"broker",
                permissions:['addItem','updateItem','deleteItem','getItem']
              }
     ];

     return   role;
    }
 

