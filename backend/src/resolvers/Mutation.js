import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
// const saltRounds = 10;
// const secret = "ji_ji_tai_da_le";

const Mutation = {
  async createUser(parent, { data }, { saltRounds, userModel }, info) {
    // if (!me) throw new Error("Plz Log In First");
    const user = await userModel.findOne({ name: data.name });

    if (user) {
      return {
        ok: false,
        error: "User exist",
      };
    }

    data.password = await bcrypt.hash(data.password, saltRounds);
    let newuserinfo = {
      id: uuidv4(),
      ...data,
      scores: {},
    };
    let newuser = await new userModel(newuserinfo).save();

    return {
      ok: true,
      user: newuser,
    };
  },
  async loginUser(parent, { data }, { userModel }, info) {
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
  async updateUser(parent, { data }, { userModel, pubSub }, info) {
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
        [`scores.${data.game}`]: { $exists: true },
      })
      .select({ id: 1, name: 1, [`scores.${data.game}`]: 1 })
      .sort({ [`scores.${data.game}`]: 1 })
      .limit(30);

    pubSub.publish(`${data.game}`, {
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
