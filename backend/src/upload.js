import userModel from "./models/user";

const dataInit = async () => {
  const checkData = await userModel.find();
  if (checkData.length !== 0) {
    await userModel.deleteMany({});
    console.log("Database initialized!");
  }
};

export { dataInit };
