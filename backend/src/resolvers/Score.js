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
    // if(parent[0]==="POSE_FLAPPY_BIRD"){
    //   return parent[1]
    // }
    // const minute = ("0" + Math.floor((parent[1] / 60000) % 60)).slice(-2);
    // const second = ("0" + Math.floor((parent[1] / 1000) % 60)).slice(-2);
    // const milsec = ("0" + ((parent[1] / 10) % 100)).slice(-2);
    return parent[1];
  },
};

export default Score;
