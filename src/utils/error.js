


exports.Db_Error=async (error)=>{
const errorToThrow =new Error();
  switch (error?.code) {   
                   case '23505':
                       errorToThrow.message = 'User already exists';
                       errorToThrow.statusCode = 400;
                       break;
                   default:
                       errorToThrow.statusCode = 500;
               }

               return errorToThrow;
    
}
