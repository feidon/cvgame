const Query = {
  users: async (parent, args, { userModel }) => {
    const users = await userModel
      .find({
        [`scores.${args.game}`]: { $exists: true },
      })
      .sort({ [`scores.${args.game}`]: -1 });
    return users;
  },
};

export default Query;
