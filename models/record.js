const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    key: {
        type: String,
    },
    createdAt: {
        type: Date
    },
    counts: {
        type: [Number]
    },
    value: {
        type: String
    }
});

const record = mongoose.model('record', schema);

module.exports = record;