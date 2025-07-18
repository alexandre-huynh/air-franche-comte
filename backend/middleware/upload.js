const multer = require('multer');
const path = require('path');

// Configuration du stockage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const filename = `user-${req.user.id}-${Date.now()}${ext}`;
        cb(null, filename);
    },
});

// Filtre simple (optionnel) : accepter uniquement les images
const fileFilter = (req, file, cb) => {
    const isImage = file.mimetype.startsWith('image/');
    cb(null, isImage);
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
