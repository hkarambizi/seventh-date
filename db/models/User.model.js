const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    age: {
        type: Number,
        default: null
    },
    gender: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    avatar: {
        type: String,
        default: 'https://www.pngitem.com/pimgs/m/421-4212266_transparent-default-avatar-png-default-avatar-images-png.png'
    },
    email: {
        type: String,
        default: '',
        unique: true
    },
    password: {
        type: String,
        default: ''
    },
    isActive: {
        type: Boolean,
        default: true
    },
    userAccess: {
      type: String,
      default: 'member'
  },
}, {
    timestamps: true,
})

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password)
}

const User = mongoose.model('User', userSchema)

module.exports = User
