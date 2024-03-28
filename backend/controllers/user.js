const User = require('../schemas/user');

const signup = async (req, res) => {
  const { username, faceImg } = req.body;
  try {
    // Check if the username already exists
    const existingUser = await User.findOne({
      username: username,
    });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Create a new document with the provided data
    const newData = new UserData({
      username: username,
      faceImg: faceImg,
    });

    // Save the document to the database
    await newData.save();
    res.status(201).json({ message: 'Data added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const login = async (req, res) => {
  const { username, faceImg } = req.body;
  try {
    // Check if the username already exists
    const existingUser = await User.findOne({
      username: username,
      faceImg: faceImg,
    });

    if (existingUser) {
      return res.status(201).json({ message: 'Login successful' });
    }

    res.status(500).json({ message: 'Invalid User' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { signup, login };
