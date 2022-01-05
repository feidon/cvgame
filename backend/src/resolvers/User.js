const User = {
  async scores(parent, args, { userModel }, info) {
    const userscores = await userModel.findOne({ id: parent.id });
    if (!userscores.scores) {
      return null;
    }
    return Object.entries(userscores.scores);
  },
};

export default User;
