import mongoose from 'mongoose'

const medicalHistorySchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  staff: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff',
    required: true,
  },
  medicalPrescription: {
    type: String,
    default: '',
  },
  diagnosticResult: {
    type: String,
    default: '',
  },
  test: {
    type: String,
    enum: ['Blood test', 'Urine test'],
    default: ''
  },
  date: {
    type: Date,
    required: true,
  }
})

const MedicalHistory = mongoose.model('MedicalHistory', medicalHistorySchema)

export default MedicalHistory
