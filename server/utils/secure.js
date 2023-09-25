const { verifyJWT } = require("./jwt");
const userModel = require("../modules/users/user.model");

const compareRole = (requiredRole, userRole) => {
  if (requiredRole.length < 1) return true;
  return userRole.some((v) => requiredRole.indexOf(v) !== -1);
};

const secureAPI = (roles) => {
  return async (req, res, next) => {
    try {
      const token = req?.headers?.authorization;
      if (!token) throw new Error("Access Token Required");
      const accessToken = token.split("Bearer ")[1];
      const { data } = verifyJWT(accessToken);
      const { email } = data;
      // check if the user has required role or not
      const user = await userModel.findOne({ email });
      if (!user) throw new Error("User not found");
      req.currentUser = user?._id;
      req.currentRoles = user?.roles;
      // compare role against secureAPI passed role
      const isValidRole = compareRole(roles ?? [], user?.roles);
      if (!isValidRole) throw new Error("User unauthorized");
      next();
    } catch (e) {
      next(e);
    }
  };
};

module.exports = secureAPI;
