const pool = require('../db')
const validator = require('validator')
const path = require('path')

exports.updateUser = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ message: 'Bad Request: No request body' })
    }

    let { email, username } = req.body

    // username et email peuvent venir en multipart/form-data en texte (req.body)
    if (!username || !email) {
        return res.status(400).json({ message: 'Bad Request: Missing username or email' })
    }

    // Assainissement
    username = validator.escape(username.trim())
    email = validator.normalizeEmail(email.trim())

    if (!validator.isAlphanumeric(username)) {
        return res.status(400).json({ message: 'Forbidden chars in username' })
    }

    try {
        // Vérifier si username est déjà utilisé par un autre user
        const [existingUsers] = await pool.query(
            'SELECT id FROM users WHERE username = ? AND id != ?',
            [username, req.user.id]
        )
        if (existingUsers.length > 0) {
            return res.status(409).json({ message: 'Username already exists' })
        }

        // Préparer la requête UPDATE avec avatar_url si fichier uploadé
        let avatarUrl = null
        if (req.file) {
            avatarUrl = `/uploads/${req.file.filename}`
        }

        if (avatarUrl) {
            await pool.query(
                'UPDATE users SET email = ?, username = ?, avatar_url = ? WHERE id = ?',
                [email, username, avatarUrl, req.user.id]
            )
        } else {
            await pool.query(
                'UPDATE users SET email = ?, username = ? WHERE id = ?',
                [email, username, req.user.id]
            )
        }

        // Optionnel: récupérer le user à jour
        const [rows] = await pool.query('SELECT id, first_name, last_name, username, email, avatar_url FROM users WHERE id = ?', [req.user.id])
        const user = rows[0]

        user.avatar_url = "http://localhost:3000" + user.avatar_url;

        res.status(200).json({ message: 'User updated successfully', user })

    } catch (error) {
        console.error('Error updating user:', error)
        res.status(500).json({ message: 'Server error' })
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
