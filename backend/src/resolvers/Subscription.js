const Subscription = {
  userUpdated: {
    subscribe: (parent, args, { pubSub }) => {
      return pubSub.asyncIterator(`${args.data.game}`);
    },
  },
};

export default Subscription;
