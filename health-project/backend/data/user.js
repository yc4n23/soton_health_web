import bcrypt from 'bcryptjs'

const user = [
  {
    name: 'John Smith',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    dateOfBirth: '1988-06-15',
    gender: 'Male',
    address: '123 Cherry Lane, Springfield',
    postalCode: '98765',
    isAdmin: true,
    isCheck: true,  // 新增数据项
    illnessDescription: 'Persistent cough and fever for three days.',
    treatmentAdvice: 'Recommended to undergo a full blood test and chest X-ray.',
  },
  {
    name: 'Mary Johnson',
    email: 'Mary@example.com',
    password: bcrypt.hashSync('123456', 10),
    dateOfBirth: '1992-11-30',
    gender: 'Female',
    address: '456 Maple Street, Capital City',
    postalCode: '12345',
    isAdmin: true,
    isCheck: true,  // 新增数据项
    illnessDescription: 'Migraines recurring frequently over the last month.',
    treatmentAdvice: 'Advised to consult a neurologist and consider lifestyle changes.',
  },
  {
    name: 'Robert Williams',
    email: 'Robert@example.com',
    password: bcrypt.hashSync('123456', 10),
    dateOfBirth: '1975-09-25',
    gender: 'Male',
    address: '789 Oak Avenue, Lakeside',
    postalCode: '54321',
    isAdmin: false,
    isCheck: true,  // 新增数据项
    illnessDescription: 'Chronic back pain, worsens with prolonged sitting.',
    treatmentAdvice: 'Suggested physical therapy and ergonomic adjustments at work.',
  },
  {
    name: 'Jennifer Brown',
    email: 'Jennifer@example.com',
    password: bcrypt.hashSync('123456', 10),
    dateOfBirth: '1980-03-12',
    gender: 'Female',
    address: '321 Pine Street, Riverside',
    postalCode: '67890',
    isAdmin: false,
    isCheck: true,  // 新增数据项
    illnessDescription: 'Insomnia, difficulty falling asleep and staying asleep.',
    treatmentAdvice: 'Recommended sleep hygiene practices and relaxation techniques.',
  },
  {
    name: 'Christopher Davis',
    email: 'Chris@example.com',
    password: bcrypt.hashSync('123456', 10),
    dateOfBirth: '1998-07-05',
    gender: 'Male',
    address: '567 Elm Avenue, Mountainview',
    postalCode: '23456',
    isAdmin: false,
    isCheck: true,  // 新增数据项
    illnessDescription: 'Seasonal allergies causing nasal congestion and sneezing.',
    treatmentAdvice: 'Prescribed antihistamines and advised to avoid allergens.',
  },
  {
    name: 'Jessica Garcia',
    email: 'Jessica@example.com',
    password: bcrypt.hashSync('123456', 10),
    dateOfBirth: '1986-12-18',
    gender: 'Female',
    address: '890 Pine Lane, Sunset Valley',
    postalCode: '76543',
    isAdmin: false,
    isCheck: true,  // 新增数据项
    illnessDescription: 'Anxiety and panic attacks triggered by social situations.',
    treatmentAdvice: 'Cognitive-behavioral therapy and relaxation techniques recommended.',
  },
  {
    name: 'Daniel Rodriguez',
    email: 'Daniel@example.com',
    password: bcrypt.hashSync('123456', 10),
    dateOfBirth: '1970-05-20',
    gender: 'Male',
    address: '234 Cedar Street, Oceanview',
    postalCode: '32198',
    isAdmin: false,
    isCheck: true,  // 新增数据项
    illnessDescription: 'Type 2 diabetes, struggling to manage blood sugar levels.',
    treatmentAdvice: 'Dietary changes and regular exercise regimen prescribed.',
  },
  {
    name: 'Sarah Martinez',
    email: 'Sarah@example.com',
    password: bcrypt.hashSync('123456', 10),
    dateOfBirth: '1995-02-08',
    gender: 'Female',
    address: '456 Oakwood Drive, Lakeshore',
    postalCode: '87654',
    isAdmin: false,
    isCheck: true,  // 新增数据项
    illnessDescription: 'Stress-related headaches and muscle tension in shoulders.',
    treatmentAdvice: 'Stress management techniques and regular massage therapy suggested.',
  },
]


export default user
