const Score = {
  game(parent, args, { userModel }, info) {
    if (parent.length === 0) {
      return null;
    }
    return parent[0];
  },
  score(parent, args, { userModel }, info) {
    if (parent.length === 0) {
      return null;
    }
    return parent[1];
  },
};

export default Score;
