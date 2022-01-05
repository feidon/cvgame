import bcrypt from "bcrypt";
const saltRounds = 8787;

const Mutation = {
  async createUser(parent, args, { db, pubsub }, info) {
    const user = await db.users.findOne({ name: args.data.name });

    if (user) {
      return {
        ok: false,
        error: "User exist",
      };
    }

    args.data.password = await bcrypt.hash(args.data.password, saltRounds);

    let newuser = await new db.users(args.data).save();

    pubsub.publish(`User`, {
      user: {
        mutation: "CREATED",
        data: newuser,
      },
    });

    return {
      ok: true,
      user: newuser,
    };
  },
  async loginUser(parent, args, { db }, info) {
    const user = await db.users.findOne({ name: args.data.name });

    if (!user) {
      return {
        ok: false,
        error: "User doesn't exist",
      };
    }

    const pass = await bcrypt.compare(args.data.password, user.password);

    if (!pass) {
      return {
        ok: false,
        error: "Wrong password",
      };
    }

    return {
      ok: true,
      name: user.name,
    };
  },
};

export { Mutation as default };
