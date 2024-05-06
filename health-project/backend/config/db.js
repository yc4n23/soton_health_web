//实现数据库的连接
import mongoose from "mongoose"

//连接数据库
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    }
    )
    console.log(`MongoDB is connected!!!!!: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold)
    process.exit(1)
  }
}

export default connectDB