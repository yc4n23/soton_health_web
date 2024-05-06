import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  isCheck: { // New field added
    type: Boolean,
    default: false,
  },
  illnessDescription: {
    type: String, // Removed the 'required: true' attribute
  },
  treatmentAdvice: {
    advice: {
      type: String,
      required: false,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Staff',
      required: false,
    }
  },
}, {
  timestamps: true, // Automatically create createdAt and updatedAt fields
})

// Password encryption middleware
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// Method to check if the entered password matches the hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User', userSchema)

export default User
