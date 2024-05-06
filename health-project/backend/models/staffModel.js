import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const staffSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
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
  position: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  availableTimes: [{
    date: {
      type: Date,
      required: true,
    },
    slots: [{
      type: String,
      required: true,
    }]
  }],
  rating: {
    type: Number,
    required: true,
  },
  numReviews: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isCheck: {
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true,
})

// Password encryption middleware
staffSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// Method to check if the entered password matches the hashed password
staffSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

const Staff = mongoose.model('Staff', staffSchema)

export default Staff
