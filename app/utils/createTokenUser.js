const createTokenUser = (user) => {
  return {
    name: user.name,
    id: user._id,
    role: user.role,
    email: user.email,
  };
};


module.exports = { createTokenUser };
