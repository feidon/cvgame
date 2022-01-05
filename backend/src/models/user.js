import mongoose from "mongoose";

/**
 * Task Schema for MongoDB
 */
const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, "id field is required."],
  },
  name: {
    type: String,
    required: [true, "Name field is required."],
  },
  password: {
    type: String,
    required: [true, "Password field is required."],
  },
  scores: {
    type: Schema.Types.Mixed,
    required: [true, "id field is required."],
  },
});

export default mongoose.model("user", UserSchema);
