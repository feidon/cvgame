import bcrypt from "bcrypt";
import { uuid } from "uuidv4";
const saltRounds = 8787;

const Mutation = {
  async createUser(parent, { data }, { userModel, pubsub }, info) {
    const user = await userModel.findOne({ name: data.name });

    if (user) {
      return {
        ok: false,
        error: "User exist",
      };
    }

    data.password = await bcrypt.hash(data.password, saltRounds);
    newuserinfo = {
      id: uuid(),
      ...data,
      scores: {},
    };
    let newuser = await new userModel(newuserinfo).save();

    return {
      ok: true,
      user: newuser,
    };
  },
  async loginUser(parent, { data }, { userModel, pubsub }, info) {
    const user = await userModel.findOne({ name: data.name });

    if (!user) {
      return {
        ok: false,
        error: "User doesn't exist",
      };
    }

    const pass = await bcrypt.compare(data.password, user.password);

    if (!pass) {
      return {
        ok: false,
        error: "Wrong password",
      };
    }

    return {
      ok: true,
      user: user,
    };
  },
  async updateUser(parent, { data }, { userModel, pubsub }, info) {
    const user = await userModel.findOne({ name: data.name });

    if (!user) {
      return {
        ok: false,
        error: "User doesn't exist",
      };
    }

    const userupdated = await userModel.findOneAndUpdate(
      { name: data.name },
      { $set: { [`scores.${data.game}`]: data.score } },
      {
        new: true,
        upsert: true,
        strict: false,
      }
    );

    const users = await userModel
      .find({
        [`scores.${args.game}`]: { $exists: true },
      })
      .sort({ [`scores.${args.game}`]: -1 });

    pubsub.publish(`${data.game}`, {
      userUpdated: {
        mutation: "UPDATED",
        data: users,
      },
    });

    return {
      ok: true,
      user: userupdated,
    };
  },
};

export default Mutation;
