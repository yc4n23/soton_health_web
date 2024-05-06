import express from 'express'
import { protect, admin } from '../middleware/authMiddleware.js'
import {
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
} from '../controllers/userController.js'
const router = express.Router()

router
  .route('/')
  .post(registerUser)
  .get(protect, admin, getUsers)

router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)

router.post('/login', authUser)

router.route('/orders/:id').get(protect, getOrderById)

router.get('/medicalhistory/:id', protect, getMedicalHistoriesByUser)

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

export default router