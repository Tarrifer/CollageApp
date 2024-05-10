// userType.js

// let userType = "Student";
userType = "Student" || "Teacher" || "Admin" || "MasterAdmin";
const getUserType = () => {
  return userType;
};

const setUserType = (type) => {
  userType = type;
};

const promoteToAdmin = () => {
  if (userType === "Teacher") {
    userType = "Admin";
    return true;
  }
  return false; // If the userType is not Teacher, promotion fails
};

const isMasterAdmin = () => {
  return userType === "MasterAdmin";
};

export { getUserType, setUserType, promoteToAdmin, isMasterAdmin };
