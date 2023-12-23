// Imports the schema and model properties from mongoose.
// Schema is used to define the structure of our documents in MongoDB.
// Model is a function within Mongoose that allows us to create a model based on the Schema. Models represent the documents in our MongoDB collection.
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'thought',
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user',
        }
    ],
})

// This creates a virtual property called friendCount on the userSchema.
// It uses a getter function that retrieves the length of the user's friends array, providing a count for the number of friends a user has.
// Calling user.friendCount on a specific document will calculate the number of friends a user has.
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});


const User = model('user', userSchema);

module.exports = User;