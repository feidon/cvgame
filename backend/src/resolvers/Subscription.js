const Subscription = {
  userUpdated: {
    subscribe: (parent, args, { pubSub }) => {
      return pubSub.asyncIterator(`${args.game}`);
    },
  },
};

export default Subscription;
