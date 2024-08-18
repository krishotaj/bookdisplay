const mongoose = require('mongoose');


const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    pages: [
        {
            pageNumber: {
                type: Number,
                required: true,
            },
            content: {
                type: String,
                required: true,
            },
        },
    ],
}, { timestamps: true });

const Book = mongoose.model('Book', BookSchema);
module.exports = Book;