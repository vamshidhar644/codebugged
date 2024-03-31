const User = require('../schemas/user');
const { compareDetections } = require('../utils/Match');

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
  try {
    const { username, detections } = req.body;

    // Retrieve user from database
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare detections
    const isMatch = await compareDetections(detections, user.detections);

    if (isMatch) {
      return res.status(200).json({ message: 'Login successful' });
    } else {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { signup, login };
