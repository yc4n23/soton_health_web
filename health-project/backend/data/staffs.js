import bcrypt from 'bcryptjs'

const staff = [
  {
    name: 'Alice Johnson',
    image: '/images/staff1.jpg',
    email: 'Alice@example.com',
    password: bcrypt.hashSync('123456', 10),
    dateOfBirth: '1980-02-15',
    gender: 'Female',
    position: 'Doctor',
    department: 'Cardiology',
    availableTimes: [
      { date: '2024-05-03', slots: ['10:00', '11:00', '12:00'] },
      { date: '2024-05-10', slots: ['14:00', '15:00', '16:00'] }
    ],
    rating: 4.5,
    numReviews: 22,
    description: 'Dr. Alice Johnson, a renowned cardiologist with extensive research in cardiovascular disease prevention.'
  },
  {
    name: 'Bob Smith',
    image: '/images/staff2.jpg',
    email: 'Bob@example.com',
    password: bcrypt.hashSync('123456', 10),
    dateOfBirth: '1975-08-20',
    gender: 'Male',
    position: 'Practitioner',
    department: 'Dermatology',
    availableTimes: [
      { date: '2024-05-04', slots: ['09:00', '10:00'] },
      { date: '2024-05-11', slots: ['11:00', '12:00'] }
    ],
    rating: 4.0,
    numReviews: 18,
    description: 'Bob Smith, a skilled dermatology practitioner known for his innovative treatments in skin care.'
  },
  {
    name: 'Carol White',
    image: '/images/staff3.jpg',
    email: 'Carol@example.com',
    password: bcrypt.hashSync('123456', 10),
    dateOfBirth: '1990-07-30',
    gender: 'Female',
    position: 'Doctor',
    department: 'Neurology',
    availableTimes: [
      { date: '2024-05-05', slots: ['13:00', '14:00', '15:00'] }
    ],
    rating: 3.8,
    numReviews: 15,
    description: 'Dr. Carol White, distinguished neurologist with a focus on neurodegenerative diseases.'
  },
  {
    name: 'Daniel Lee',
    image: '/images/staff4.jpg',
    email: 'Daniel@example.com',
    password: bcrypt.hashSync('123456', 10),
    dateOfBirth: '1982-11-12',
    gender: 'Male',
    position: 'Doctor',
    department: 'Pediatrics',
    availableTimes: [
      { date: '2024-05-06', slots: ['09:00', '10:00', '11:00'] }
    ],
    rating: 4.2,
    numReviews: 20,
    description: 'Dr. Daniel Lee, a pediatric specialist with awards in pediatric medicine and child health advocacy.'
  },
  {
    name: 'Eva Green',
    image: '/images/staff5.jpg',
    email: 'Eva@example.com',
    password: bcrypt.hashSync('123456', 10),
    dateOfBirth: '1979-03-22',
    gender: 'Female',
    position: 'Practitioner',
    department: 'Orthopedics',
    availableTimes: [
      { date: '2024-05-07', slots: ['15:00', '16:00', '17:00'] }
    ],
    rating: 4.7,
    numReviews: 25,
    description: 'Eva Green, an orthopedic practitioner famous for her advancements in joint replacement technology.'
  },
  {
    name: 'Frank Miles',
    image: '/images/staff6.jpg',
    email: 'Frank@example.com',
    password: bcrypt.hashSync('123456', 10),
    dateOfBirth: '1985-06-18',
    gender: 'Male',
    position: 'Doctor',
    department: 'Emergency',
    availableTimes: [
      { date: '2024-05-08', slots: ['12:00', '13:00', '14:00'] }
    ],
    rating: 3.9,
    numReviews: 17,
    description: 'Dr. Frank Miles, emergency department lead with expertise in acute trauma care and emergency response.'
  },
  {
    name: 'Grace Hall',
    image: '/images/staff7.jpg',
    email: 'Grace@example.com',
    password: bcrypt.hashSync('123456', 10),
    dateOfBirth: '1988-12-30',
    gender: 'Female',
    position: 'Doctor',
    department: 'General Surgery',
    availableTimes: [
      { date: '2024-05-09', slots: ['10:00', '11:00', '12:00'] }
    ],
    rating: 4.3,
    numReviews: 19,
    description: 'Dr. Grace Hall, an accomplished surgeon known for her pioneering techniques in minimally invasive surgery.'
  },
  {
    name: 'Henry Adams',
    image: '/images/staff8.jpg',
    email: 'Henry@example.com',
    password: bcrypt.hashSync('123456', 10),
    dateOfBirth: '1970-05-15',
    gender: 'Male',
    position: 'Practitioner',
    department: 'Radiology',
    availableTimes: [
      { date: '2024-05-12', slots: ['14:00', '15:00', '16:00'] }
    ],
    rating: 4.1,
    numReviews: 22,
    description: 'Henry Adams, expert in radiological diagnostics and imaging with numerous publications on radiographic techniques.'
  },
  {
    name: 'Isabella Morris',
    image: '/images/staff9.jpg',
    email: 'Isabella@example.com',
    password: bcrypt.hashSync('123456', 10),
    dateOfBirth: '1984-09-25',
    gender: 'Female',
    position: 'Doctor',
    department: 'Oncology',
    availableTimes: [
      { date: '2024-05-13', slots: ['09:00', '10:00', '11:00'] }
    ],
    rating: 4.6,
    numReviews: 30,
    description: 'Dr. Isabella Morris, a leading oncologist, recognized for her innovative approaches to cancer treatment and research.'
  },
  {
    name: 'Jack Turner',
    image: '/images/staff10.jpg',
    email: 'Jack@example.com',
    password: bcrypt.hashSync('123456', 10),
    dateOfBirth: '1976-04-08',
    gender: 'Male',
    position: 'Doctor',
    department: 'Anesthesiology',
    availableTimes: [
      { date: '2024-05-14', slots: ['13:00', '14:00', '15:00'] }
    ],
    rating: 4.4,
    numReviews: 21,
    description: 'Dr. Jack Turner, specialized in anesthesiology with a focus on patient safety and pain management during surgical procedures.'
  }
]

export default staff
