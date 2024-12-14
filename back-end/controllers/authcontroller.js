import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(`Received login request for email: ${email}`);
        const user = await User.findOne({ email });
        if (!user) {
            console.log('Email not found in database');
            return res.status(404).json({ success: false, error: 'Khong ton tai email' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(404).json({ success: false, error: 'Password khong chinh xac' });
        }
        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '10d' });
        res.status(200).json({ success: true, token, user: { email: user.email, name: user.name, _id: user._id, role: user.role } });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};
const verify = async (req, res) => {
    return res.status(200).json({ success: true, user: req.user });
};
export { login, verify };