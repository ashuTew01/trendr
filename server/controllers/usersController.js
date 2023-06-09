import User from "../models/User.js";

//READ
const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}


const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        const friends = await Promise.all(      //PTBN***********
            user.friends.map(
                (id) => User.findById(id)
            )
        )
        const formattedFriends = friends.map(
            ({_id, firstName, lastName, occupation, location, picturePath}) => {
                return {_id, firstName, lastName, occupation, location, picturePath};
            }
        )

        res.status(200).json(formattedFriends);

    } catch (err) {
        res.status(404).json({message: err.message});
    }
}

//Update
const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if(user.friends.includes(friendId)){
            user.friends = user.friends.filter((id_) => id_ !== friendId);
            friend.friends = friend.friends.filter((id_) => id_ !== id);
        } else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }

        await user.save();
        await friend.save();

        // const friendIndex = user.friends.indexOf(friendId);      slightly faster version of the above code.
        // if (friendIndex !== -1) {
        //     user.friends.splice(friendIndex, 1);
        // }

        const friends = await Promise.all(      //PTBN***********
            user.friends.map(
                (id) => User.findById(id)
            )
        )
        const formattedFriends = friends.map(
            ({_id, firstName, lastName, occupation, location, picturePath}) => {
                return {_id, firstName, lastName, occupation, location, picturePath};
            }
        )
        
        res.status(200).json(formattedFriends);

    } catch (err) {
        
        res.status(404).json({message: err.message});
    }
}


export { 
    getUser,
    getUserFriends,
    addRemoveFriend
 }