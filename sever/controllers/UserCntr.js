import User from "../models/User.js";

// Get Single User Info
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    let user = await User.findById(id);
    const userObject = user.toObject();
    delete userObject.password;
    res.status(200).json({ user: userObject });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Get All Users Friends Info
const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const UserFriends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formatFriends = UserFriends.map(
      ({ _id, userName, occupation, location, picPath }) => {
        return { _id, userName, occupation, location, picPath };
      }
    );
    res.status(200).json(formatFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Add or Remove User's friends
const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const userFriend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      userFriend.friends = userFriend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      userFriend.friends.push(id);
    }
    await user.save();
    await userFriend.save();

    const newFriends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formatFriends = newFriends.map(
      ({ _id, userName, occupation, location, picPath }) => {
        return { _id, userName, occupation, location, picPath };
      }
    );
    res.status(200).json(formatFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export { getUser, addRemoveFriend, getUserFriends };
