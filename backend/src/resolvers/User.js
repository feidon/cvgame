const User = {
  async scores(parent, args, { userModel }, info) {
    const user = await userModel.find({ id: parent.id });
    return user.scores;
  },
};

export default User;
