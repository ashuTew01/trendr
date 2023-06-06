import Post from "../models/Post.js";
import User from "../models/User.js";

// Create 
const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},      //PTBN-> when a map is there, its an object like {"_id1: true", ...}
            comments: []
        })

        await newPost.save();

        const allPostsUpdated = await Post.find(); //returns all the posts after adding so that the feed can be updated.
        res.status(201).json(allPostsUpdated);

    } catch (err) {
        res.status(409).json({message: err.message});
    }
}

const getFeedPosts = async(req,res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        const friends = await Promise.all(
          user.friends.map(async (id) => await User.findById(id))
        );
        const posts = [];
        
        for (const friend of friends) {
          const friendPosts = await Post.find({ userId: friend._id })
            .sort({ timestamp: -1 });
            
          posts.push(...friendPosts);
        }
        
        res.status(200).json(posts);
    } catch (err) {
        res.status(404).json({message: err.message});
    }
}

const getUserPosts = async(req,res) => {
    try {
        const userId = req.params.userId;
        const posts = await Post.find({ userId });
        res.status(200).json(posts);
    } catch (err) {
        res.status(404).json({message: err.message});
    }
}

//Update
const likePost = async(req,res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);    //since like is a map //IMP**

        if(isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            {new: true}     //As default, this function returns the object before the modification.
        )

        res.status(200).json(updatedPost);      // (USUALLY) remember TO SEND FRONTEND WHATEVER YOU DO.
    } catch (err) {
        res.status(404).json({message: err.message});
    }
}

export {
    createPost,
    getFeedPosts, 
    getUserPosts, 
    likePost 
};