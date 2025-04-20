import mongoose,  { Schema } from 'mongoose';

const postSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true});

const Post = mongoose.model('post', postSchema);

export default Post;

