import mongoose from "mongoose";
import validator from "validator"
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "please Enter an Full name"]
  },
  email: {
    type: String,
    require: [true, "please Enter email"],
    lowercase: true,
    unique: true,
    validate: [validator.isEmail, "email is not in email format"]
  },
  password: {
    type: String,
    require: [true, "please Enter an Password"],
    select: false
  },
  confirmPassword: {
    type: String,
    require: [true, "please Enter an ConformPassword"],
    validate: {
      validator: function (val) {
        return val === this.password
      },
      message: "password not match"
    },
  },
  passwordChangeAt: {
    type: Date,
    default: new Date(),
  }
})

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 8)
  this.confirmPassword = undefined
  next()
})


userSchema.methods.comparePassword = async function (pass, passDB) {
  return await bcrypt.compare(pass, passDB)
}

userSchema.methods.passwordChangeCheck = async function (jwtTime) {
  const time = parseInt(this.passwordChangeAt.getTime() / 1000)
  return jwtTime < time

}

const userModel = mongoose.model("users", userSchema)

export default userModel;