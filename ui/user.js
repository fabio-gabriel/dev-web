let currentUser = null;

module.exports = {
  getUser: () => currentUser,
  setUser: (user) => {
    currentUser = user;
  },
};
