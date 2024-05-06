import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/user.js'
import staffs from './data/staffs.js'
import waitingList from './data/waitingList.js'
import Staff from './models/staffModel.js'
import User from './models/usersModel.js'
import WaitingList from './models/waitingListModel.js'

import connectDB from './config/db.js'
import Order from './models/orderModel.js'
import MedicalHistory from './models/medicalHistory.js'
dotenv.config()
connectDB()

//插入样本数据到数据库
const importData = async () => {
  try {
    //清空数据库中的样本数据
    await WaitingList.deleteMany()
    await User.deleteMany()
    await Staff.deleteMany()
    await Order.deleteMany()
    await MedicalHistory.deleteMany()

    //实现样本数据插入
    const createdUsers = await User.insertMany(users)

    const adminUser = createdUsers[0]._id

    const sampleProducts = staffs.map((staff) => {
      return { ...staff, user: adminUser }
    })

    // Insert Waiting List data
    await WaitingList.insertMany(waitingList)

    await Staff.insertMany(sampleProducts)


    console.log('样本数据插入成功！'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

//qingkong样本数据到数据库
const destroyData = async () => {
  try {
    //清空数据库中的样本数据
    await WaitingList.deleteMany()
    await User.deleteMany()
    await Staff.deleteMany()

    console.log('样本数据销毁成功！'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

//判断命令行执行的函数
// node backend/seeder -d 执行销毁函数
if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}