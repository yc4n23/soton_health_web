import asyncHandler from 'express-async-handler'
import User from '../models/usersModel.js'
import Medical from '../models/medicalHistory.js'
import Order from '../models/orderModel.js'
import generateToken from '../utils/generateToken.js'
import Staff from '../models/staffModel.js'


//@desc    注册一个新用户到等待名单
//@route   POST /api/users/waitinglist
//@access  公开
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, dateOfBirth, gender, address, postalCode } = req.body

  // 检查用户是否已存在于用户列表中
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400).json({ message: 'User is registered' })
    return
  }
  // 注册新用户
  const user = await User.create({
    name,
    email,
    password,
    dateOfBirth,
    gender,
    address,
    postalCode
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      message: 'User added to waiting list',
      token: generateToken(user._id)   ///在这里修改了 添加了一行
    })
  } else {
    res.status(400).json({ message: 'Unable to create user' })
  }
})




//@desc    用户身份验证 & 获取Token
//@route   POST/api/users/login
//@access  公开
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  const staff = await Staff.findOne({ email })


  if (user && user.isCheck && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else if (staff && (await staff.matchPassword(password))) { // Use else if to separate the checks
    res.json({
      _id: staff._id,
      name: staff.name,
      email: staff.email,
      position: staff.position,
      department: staff.department,
      token: generateToken(staff._id),
    })
  } else {
    res.status(401).json({ message: 'Unable to obtain authorization' }) // Send a 401 response only if both checks fail
  }
}

)


//@desc    获取登录成功的用户详情
//@route   GET/api/users/profile
//@access  私密
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isCheck: user.isCheck,
      isAdmin: user.isAdmin,

    })
  } else {
    res.status(404)
    throw new Error('The user does not exist')
  }
})


//@desc    更新用户个人资料
//@route   PUT/api/users/profile
//@access  私密
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  //获取更新后的资料
  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }
    const updateUser = await user.save()
    //返回更新后的用户信息
    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
      isCheck: user.isCheck,
      token: generateToken(updateUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User is exite')
  }
})



//@desc    获取所有注册用户
//@route   GET/api/users
//@access  私密(仅限管理员)
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})


//@desc    删除注册用户
//@route   DELETE/api/users/:id
//@access  私密(仅限管理员)
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    await User.findByIdAndDelete(req.params.id)
    res.json({ message: 'User is deleted' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

//@desc    获取单个用户信息
//@route   GET/api/users/:id
//@access  私密(仅限管理员)
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')
  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

//@desc    更新单个用户信息
//@route   PUT/api/users/:id
//@access  私密(仅限管理员)
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  //获取更新后的资料
  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin
    user.isCheck = req.body.isCheck
    const updateUser = await user.save()
    //返回更新后的用户信息
    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
      isCheck: updateUser.isCheck,
    })
  } else {
    res.status(404)
    throw new Error('The user does not exist')
  }
})

//@desc    用户获取所有的medical history
//@route   GET/api/users/medicalhistory/:id
//@access  私密

const getMedicalHistoriesByUser = asyncHandler(async (req, res) => {
  const id = req.params.id // 从 URL 参数中获取用户 ID
  try {
    const medicalHistories = await Medical.find({ user: id })
      .populate('user', 'name email dateOfBirth')
    res.json(medicalHistories)
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch medical histories', error: error.message })
  }
})

//@desc    获取医生的对应的orders
//@route   GET/api/users/orders
//@access  公开
const getOrderById = asyncHandler(async (req, res) => {
  const userId = req.params.id

  const orders = await Order.find(
    {
      "user": userId
    }

  )
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



export {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  getMedicalHistoriesByUser,
  getOrderById,
}

