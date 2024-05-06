import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const waitingListSchema = mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
    unique: true, // 如果你还想保持电子邮件的唯一性，可以保留这一行
  },
  password: {
    type: String,
    required: false,
  },
  dateOfBirth: {
    type: Date,
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  postalCode: {
    type: String,
    required: false,
  },
}, {
  timestamps: true // 如果你仍然需要时间戳，保持这部分不变
})

// 密码加密中间件保持不变
waitingListSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const WaitingList = mongoose.model('WaitingList', waitingListSchema)

export default WaitingList
