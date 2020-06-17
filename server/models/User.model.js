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
    email: {
        type: String,
        default: '',
        unique: true
    },
    password: {
        type: String,
        default: ''
    },
    account: {
        type: String,
        default: ''
    },
    accountId: {
        type: String,
        default: 'testAccount'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    userAccess: {
      type: String,
      default: 'admin'
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
