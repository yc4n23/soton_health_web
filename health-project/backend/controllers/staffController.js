import asyncHandler from 'express-async-handler'
import Staff from '../models/staffModel.js'
import Order from '../models/orderModel.js'
import Medical from '../models/medicalHistory.js'

//@desc    请求所有医生
//@route   GET/api/staffs
//@access  公开
const getStaffs = asyncHandler(async (req, res) => {
  const staffs = await Staff.find({})
  res.json(staffs)
})

//@desc    请求单个医生
//@route   GET/api/staffs/:id
//@access  公开
const getStaffById = asyncHandler(async (req, res) => {
  const staff = await Staff.findById(req.params.id)
  if (staff) {
    res.json(staff)
  } else {
    res.status(404)
    throw new Error('Can not find the doctor')
  }
})

//@desc    获取医生的对应的orders
//@route   GET/api/staffs/orders
//@access  公开
const getOrderByStaffId = asyncHandler(async (req, res) => {
  const staffId = req.params.id

  const orders = await Order.find({
    "orderItems": {
      $elemMatch: {
        "staff": staffId
      }
    }
  })
    .populate({
      path: 'user', // 填充订单的用户信息
      select: 'name email birthDate'
    })

  if (orders.length > 0) {
    res.json(orders)
  } else {
    res.status(404).json({ message: 'No matching orders found' })
  }
})

//@desc    获取医生的对应的orders
//@route   GET/api/staffs/orders/:id/edit
//@access  私有
const editOrderById = asyncHandler(async (req, res) => {
  const editorder = await Order.findById(req.params.id)
    .populate('user', 'name email dateOfBirth')

  if (editorder) {
    res.json(editorder)
  } else {
    res.status(404)
    throw new Error('Can not  find out')
  }
})
const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    const itemIndex = req.body.itemIndex
    const newStatus = req.body.status

    // Check if the item index is valid
    if (order.orderItems[itemIndex]) {
      order.orderItems[itemIndex].status = newStatus
      await order.save()
      res.json({ message: 'Order status updated', order })
    } else {
      res.status(404).json({ message: 'Order item not found' })
    }
  } else {
    res.status(404).json({ message: 'Order not found' })
  }
})


//@desc    新建一个患者的医疗记录
//@route   POST /api/staffs/orders/:id/check
//@access  私有
const createMedical = asyncHandler(async (req, res) => {

  const {
    user,
    staff,
    medicalPrescription,
    diagnosticResult,
    test,
    date,
  } = req.body

  try {
    const medicalHistory = await Medical.create({
      user,
      staff,
      medicalPrescription,
      diagnosticResult,
      test,
      date: new Date(date), // 确保日期格式正确
    })

    console.log('Medical history created:', medicalHistory)
    res.status(201).json({
      ...medicalHistory._doc,
      message: 'Created medical history successfully',
    })
  } catch (error) {
    console.error('Failed to create medical history:', error)
    res.status(400).json({ message: 'Unable to create medical history', error: error.message })
  }
})

//@desc    医生获取所有的medical history
//@route   GET/api/staffs/medicalhistory/:id
//@access  私密

const getMedicalByStaff = asyncHandler(async (req, res) => {
  const id = req.params.id // 从 URL 参数中获取用户 ID
  try {
    const medicalHistories = await Medical.find({ staff: id })
      .populate('staff', 'name email')
      .populate('user', 'name email')
    res.json(medicalHistories)
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch medical histories', error: error.message })
  }
})






export {
  getStaffs,
  getStaffById,
  getOrderByStaffId,
  editOrderById,
  updateOrderStatus,
  createMedical,
  getMedicalByStaff,
}