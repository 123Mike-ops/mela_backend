function authorize(allowedRoles, allowedPermissions) {

  return function(req, res, next) {

   
    const user = req.user.rows[0];
   // The user object should contain the user's role and permissions
    if (!user) {
      return res.status(401).json({ message: "Unauthorized Access !" });
    }

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: "You dont have permission for this resource" });
    }


    const hasPermission = allowedPermissions.every(permission => user.permissions.includes(permission));

    if (!hasPermission) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
    
  }
}

module.exports=authorize;