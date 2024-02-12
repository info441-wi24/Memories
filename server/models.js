import mongoose from "mongoose";

let models = {}

await mongoose.connect("mongodb+srv://jnguyen860:12345678a@memories.hqiftv7.mongodb.net/memories");

const userSchema = mongoose.Schema({
    username: String,
    biography: String
})

const albumSchema = mongoose.Schema({
    username: String,
    title: String,
    description: String,
    photos: [String],
    likes: [String],
    created_date: Date,
});

const commentSchema = mongoose.Schema({
    username: String,
    comment: String,
    album: {type: mongoose.Schema.Types.ObjectId, ref: "Album"},
    created_date: Date
});

models.Post = mongoose.model("User", userSchema);
models.Comment = mongoose.model("Album", albumSchema);
models.UserInfo = mongoose.model("Comment", commentSchema);

export default models;