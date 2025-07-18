const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');

// XSS prevention
const sanitizeHtml = require('sanitize-html');
const validator = require('validator');

exports.loginUser = async (req, res) => {
    // Case body null
    if (req.body == undefined) {
        console.error('Bad request : No request body');
        res.status(400).json(
            { message: 'Bad Request : No request body' }
        );
    } 

    const { username, password } = req.body;

    // Case username or password null
    if (username == null || username == "" || password == null || password == ""){
        console.error('Bad request : Missing username or password');
        res.status(400).json(
            { message: 'Bad Request : Missing username or password' }
        );
    }

    // Verify if there's no forbidden characters in username to prevent XSS
    if (!validator.isAlphanumeric(username)) {
        return res.status(400).json({ message: 'Forbidden chars in username' });
    }

    try {
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);

    if (rows.length === 0) {
        return res.status(401).json({ message: 'Utilisateur introuvable' });
    }

    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Mot de passe invalide' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });

    res.json({
        message: 'Connexion réussie',
        token,
        user: {
        id: user.id,
        username: sanitizeHtml(user.username),
        email: sanitizeHtml(user.email),
        first_name: sanitizeHtml(user.first_name),
        last_name: sanitizeHtml(user.last_name),
        },
    });

    } catch (error) {
    console.error('Erreur lors de la connexion :', error);
    res.status(500).json({ message: 'Erreur serveur' });
    }
};


exports.registerUser = async (req, res) => {
    // Case body null
    if (req.body == undefined) {
        console.error('Bad request : No request body');
        res.status(400).json(
            { message: 'Bad Request : No request body' }
        );
    }

    const { firstName, lastName, email, username, password } = req.body;

    // Case username or password null
    if (username == null || username == "" || password == null || password == ""){
        console.error('Bad request : Missing username or password');
        res.status(400).json(
            { message: 'Bad Request : Missing username or password' }
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

        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await pool.query('INSERT INTO users (first_name, last_name, email, username, password_hash) VALUES (?, ?, ?, ?, ?)',
            [firstName, lastName, email, username, hashedPassword]);

        res.status(201).json({ message: 'User registered successfully', userId: result.insertId });

    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Server error' });
    }
}
