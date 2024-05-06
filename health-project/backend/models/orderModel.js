import mongoose from 'mongoose'

const orderItemSchema = mongoose.Schema({
  staff: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  slot: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Scheduled', 'Transfer', 'Cancelled', 'Ready'],
    default: 'Ready'
  },
  notes: {
    type: String,
  }
}, {
  timestamps: true,
})

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  orderItems: [orderItemSchema],
  illnessDescription: {
    type: String,
    required: true,
  },

},
  {
    timestamps: true,
  })

const Order = mongoose.model('Order', orderSchema)

export default Order
