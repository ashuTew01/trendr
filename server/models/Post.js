import mongoose from 'mongoose';
// import bcrypt from "bcryptjs"

const PostSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 50
        },
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 50
        },
        location: String,
        description: String,
        picturePath: {
            type: String,
            default: ""
        },
        userPicturePath: String,
        likes: {
            type: Map,
            of: Boolean,
        },
        comments: {
            type: Array,
            default: []
        }
    }, {timestamps: true}
);

const Post = mongoose.model("Post", PostSchema);

export default Post;

