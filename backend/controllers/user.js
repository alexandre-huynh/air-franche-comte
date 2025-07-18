const pool = require('../db');

// XSS prevention
const sanitizeHtml = require('sanitize-html');
const validator = require('validator');

exports.updateUser = async (req, res) => {
    // Case body null
    if (req.body == undefined) {
        console.error('Bad request : No request body');
        res.status(400).json(
            { message: 'Bad Request : No request body' }
        );
    }

    const { email, username } = req.body;

    // Case username or password null
    if (username == null || username == "" || email == null || email == ""){
        console.error('Bad request : Missing username or email');
        res.status(400).json(
            { message: 'Bad Request : Missing username or email' }
        );
    }

    // Verify if there's no forbidden characters in username to prevent XSS
    if (!validator.isAlphanumeric(username)) {
        return res.status(400).json({ message: 'Forbidden chars in username' });
    }

    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);

        if (rows.length > 0) {
            return res.status(409).json({ message: 'Username already exists' });
        }

        const [result] = await pool.query('UPDATE users SET email = ?, username = ? WHERE id = ?', [email, username, req.user.id]);

        res.status(201).json({ message: 'User registered successfully', userId: result.insertId });

    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.getUserReservations = async (req, res) => {
    try {
        const userId = req.user.id;

        const [rows] = await pool.query(
            'SELECT * FROM reservations WHERE user_id = ?',
            [userId]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: 'No reservations found for this user' });
        }

        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching user reservations:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
