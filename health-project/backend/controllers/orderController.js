import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'



//@desc    创建预约订单
//@route   POST/api/orders
//@access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    preAppointmentItems,
    illnessDescription,
  } = req.body

  if (!preAppointmentItems || preAppointmentItems.length === 0) {
    res.status(400)
    throw new Error('No reservation information。')
  }

  // 映射预约项目以创建订单项
  const appointmentItems = preAppointmentItems.map(item => ({
    staff: item.staff,
    date: item.date,
    slot: item.slot,
  }))

  if (!req.user) {
    res.status(401)
    throw new Error('Unauthorized, user not found')
  } else {
    const order = new Order({
      user: req.user._id, // req.user 由身份验证中间件提供
      orderItems: appointmentItems,
      illnessDescription,
    })
    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
})



//@desc    依据订单id获取订单
//@route   GET/api/orders/:id
//@access  私密
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate('user', 'name email') // 已存在的填充
    .populate('orderItems.staff', 'name image position department')

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('can not find out')
  }
})


//@desc    创建转诊预约订单
//@route   POST/api/orders/edit
//@access  Private
const transOrder = asyncHandler(async (req, res) => {
  const {
    preAppointmentItems,
    illnessDescription,
  } = req.body

  const appointmentItems = preAppointmentItems.map(item => ({
    staff: item.staff,
    date: item.date,
    slot: item.slot,
  }))

  try {
    const order = new Order({
      user: req.staff.id,
      orderItems: appointmentItems,
      illnessDescription,
    })
    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  } catch (error) {
    res.status(500).json({ message: 'Appointment creation failure' })
  }
})


export { addOrderItems, getOrderById, transOrder }