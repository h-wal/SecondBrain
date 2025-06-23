import mongoose, { Schema } from "mongoose";

main().catch(err => console.log(err));

async function main() {
  try {
    await mongoose.connect('mongodb+srv://harsh_agarwal:asdf1234@secbrain.ael1lwu.mongodb.net/secbrain');
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

const userSchema = new Schema({
    username: {type: String, unique: true , required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

const contentSchema = new Schema({
    type: String,
    title: String,
    content: String,
    tags: [{type: Schema.Types.ObjectId, ref: "tags"}],
    date: String,
    user: {
        type: Schema.Types.ObjectId, 
        ref: "user"
    }
})

const tagsSchema = new Schema({
    title: String,
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
})

const userModel = mongoose.model("user", userSchema)
const contentModel = mongoose.model("content", contentSchema)
const tagsModel = mongoose.model("tags", tagsSchema)

export { userModel, contentModel, tagsModel };