const Query = {
  users: async (parent, args, { userModel }) => {
    const users = await userModel.find({}, "name scores").limit(30);
    return users;
  },
};

export default Query;
