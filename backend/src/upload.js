import userModel from "./models/user";

const example = [
  {
    id: "1",
    name: "fei",
    password: "$2b$10$m0lmq4uOPmIUAcr7wIF9JOorVihF/zwzfN1mEScZ3aQ6z/wnn1Jum",
    scores: {
      FINGER_MORA: 87870,
      FINGER_MATH: 78780,
      POSE: 9450,

      FINGER_EXERCISE: 1450,
    },
  },
  {
    id: "2",
    name: "ric",
    password: "$2b$10$m0lmq4uOPmIUAcr7wIF9JOorVihF/zwzfN1mEScZ3aQ6z/wnn1Jum",
    scores: {
      FINGER_MORA: 1450,

      FINGER_MATH: 9450,

      POSE: 78780,

      FINGER_EXERCISE: 87870,
    },
  },
  {
    id: "3",
    name: "mary",
    password: "$2b$10$m0lmq4uOPmIUAcr7wIF9JOorVihF/zwzfN1mEScZ3aQ6z/wnn1Jum",
    scores: {
      FINGER_MORA: 9450,

      FINGER_MATH: 1450,

      POSE: 87870,

      FINGER_EXERCISE: 78780,
    },
  },
];

const dataInit = async () => {
  const checkData = await userModel.find();
  await userModel.deleteMany({});
  await userModel.insertMany(example);
  console.log("Database initialized!");
};
// && process.env.EXAM === "true"

export { dataInit };
