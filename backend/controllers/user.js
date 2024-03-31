const User = require('../schemas/user');

const signup = async (req, res) => {
  const { username, detections } = req.body;

  try {
    if (detections) {
      // Save user data with face descriptor
      await User.create({ username, detections });
      res.status(201).json({ message: 'User registered successfully.' });
    } else {
      res
        .status(400)
        .json({ message: 'No face detected. Please capture a valid image.' });
    }
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error.' });
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
