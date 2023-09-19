const mongoose = require('mongoose');
const {Schema}=mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true,

    },
    password: {
        type: String,
        required: true
    },
})
UserSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model('user', UserSchema);
module.exports = User;