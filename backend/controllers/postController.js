//const asyncHandler = require("../utils/asyncHandler.js");
import Post from '../models/postModel.js'
import { asyncHandler } from '../utils/asyncHandler.js';
import User from '../models/userModel.js';
import { ApiError } from '../utils/ApiError.js';

/* Create Post API. */
const createPost = asyncHandler(async (req, res) => {

    console.log("this is outside of try", req.user, req.user?._id);

    try {
        const isUserPresent = await User.findById(req.user?._id)

        if (!isUserPresent) {
            throw new ApiError(404, "User does not exist")
        }

        const { title, description } = req.body;

        // Create a new post document
        const newPost = await Post.create({
            title,
            description,
            createdBy: req.user?._id
        });

        // Save the post to the database
        console.log(newPost);

        res.status(201).json({ message: 'Post created successfully', post: newPost });

    } catch (error) {
        res.status(500).json({ error: 'Failed to create post', details: err.message });
    }
})

const getPost = asyncHandler(async (req, res) => {

    console.log("this is outside of try", req.user, req.user?._id);

    try {
        const isUserPresent = await User.findById(req.user?._id)

        if (!isUserPresent) {
            throw new ApiError(401, "Unauthorized Access")
        }

        // get a all post document
  
        const posts = await Post.find();

        res.status(201).json({ message: 'All Post fetched successfully', post: posts });

    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch post', details: err.message });
    }
})

export {
    createPost,
    getPost
}

