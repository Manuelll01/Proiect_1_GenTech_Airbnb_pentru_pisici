const mongoose = require('mongoose')

const categoriiSchema = new mongoose.Schema({
    name: String,
    numberOfPosts: Number
})

const postSchema = new mongoose.Schema({ /* all the fields all present except types since that one does not end up in the database post */
    Type: String,
    title: String,
    pricePerRoom: Number,
    priceWholePlace: Number,
    aboutProperty: Array,
    facilities: Array,
    extraServices: Array,
    rules: Array,
    image: String,
    phoneNumber: Number,
    email: String,
    startDate: Date,
    endDate: Date,
    checkInHour: String,
    checkOutHour: String,
    Description: String,
    Date: {
        type: Date,
        default: Date.now
    },
    comments: [
        {
            userName: String,
            content: String,
            date: {
                type: Date,
                default: Date.now
            }
        }
    ]
})

// const Categorie = mongoose.model('Categorie', categoriiSchema, 'YourExactCollectionName');
const Categorie = mongoose.model('Categorie', categoriiSchema, );
const Post = mongoose.model('Post', postSchema);

module.exports = {
    Categorie,
    Post
};