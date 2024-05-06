import express from 'express'
import { protect, admin } from '../middleware/authMiddleware.js'
import {
  createMedical,
  editOrderById,
  getMedicalByStaff,
  getOrderByStaffId,
  getStaffById,
  getStaffs,
  updateOrderStatus
} from '../controllers/staffController.js'
const router = express.Router()

router.route('/').get(getStaffs)
router.route('/:id').get(getStaffById)
router.route('/orders/:id').get(protect, getOrderByStaffId)
router.route('/orders/:id/check').post(protect, createMedical)
router
  .route('/orders/:id/edit')
  .get(protect, editOrderById)
  .put(protect, updateOrderStatus)

router.get('/medicalhistory/:id', protect, getMedicalByStaff)




export default router