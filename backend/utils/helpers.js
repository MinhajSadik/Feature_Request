exports.isAdmin = (req) => {
  if (req.user.role === "admin") {
    return true;
  }
  return false;
};
