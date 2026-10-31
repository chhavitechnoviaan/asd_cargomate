console.log("upload 1");
const multer = require("multer");

console.log("upload 2");
const path = require("path");

console.log("upload 3");
const fs = require("fs");

console.log("upload 4");

const uploadPath = "uploads/documents";

console.log("upload 5");

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

console.log("upload 6");
const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },

    filename: (req, file, cb) => {

        const uniqueName =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1E9) +
            path.extname(file.originalname);

        cb(null, uniqueName);
    }

});

const fileFilter = (req, file, cb) => {

    const allowed = [
        ".pdf",
        ".jpg",
        ".jpeg",
        ".png",
        ".doc",
        ".docx",
        ".xls",
        ".xlsx"
    ];

    const ext = path.extname(file.originalname).toLowerCase();

    if (allowed.includes(ext)) {
        cb(null, true);
    } else {
        cb(new Error("Unsupported file type"));
    }

};

module.exports = multer({

    storage,

    fileFilter,

    limits: {
        fileSize: 20 * 1024 * 1024
    }

});