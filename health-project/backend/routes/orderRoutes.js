import express from 'express'
import {
  addOrderItems,
  getOrderById,
  transOrder,
} from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router()
//检查token 是否存在
router.route('/').post(protect, addOrderItems)
router.route('/:id').get(protect, getOrderById)
router.route('/edit').post(protect, transOrder)





export default router