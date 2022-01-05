import userModel from "./models/user";

const dataInit = async () => {
  const checkData = await userModel.find();
  if (checkData.length !== 0 && process.env.EXAM === "true") {
    await userModel.deleteMany({});
    // await userModel.insertMany(example);
    console.log("Database initialized!");
  }
};

export { dataInit };
