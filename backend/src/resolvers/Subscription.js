const Subscription = {
  userUpdated: {
    subscribe: (parent, args, { pubSub }) => {
      return pubSub.asyncIterator("LeaderBoard");
    },
  },
};

export default Subscription;
