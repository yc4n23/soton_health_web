
import bcrypt from 'bcryptjs'

const waitingList = [
  {
    name: 'Alice Brown',
    email: 'Alice@example.com',
    password: bcrypt.hashSync('123456', 10),
    dateOfBirth: '1990-04-12',
    gender: 'Female',
    address: '789 Oak Street, Rivertown',
    postalCode: '54321',
  },
  {
    name: 'David Wilson',
    email: 'David@example.com',
    password: bcrypt.hashSync('123456', 10),
    dateOfBirth: '1985-07-23',
    gender: 'Male',
    address: '321 Pine Road, Lakeview',
    postalCode: '65432',
  },
  {
    name: 'Emily Johnson',
    email: 'Emily@example.com',
    password: bcrypt.hashSync('password', 10),
    dateOfBirth: '1992-10-15',
    gender: 'Female',
    address: '456 Maple Avenue, Hillside',
    postalCode: '98765',
  },
  {
    name: 'Michael Smith',
    email: 'Michael@example.com',
    password: bcrypt.hashSync('password123', 10),
    dateOfBirth: '1988-03-28',
    gender: 'Male',
    address: '567 Elm Street, Woodville',
    postalCode: '12345',
  },
  {
    name: 'Sophia Garcia',
    email: 'Sophia@example.com',
    password: bcrypt.hashSync('abc123', 10),
    dateOfBirth: '1995-06-19',
    gender: 'Female',
    address: '123 Cedar Lane, Springdale',
    postalCode: '87654',
  },
  {
    name: 'William Martinez',
    email: 'William@example.com',
    password: bcrypt.hashSync('qwerty', 10),
    dateOfBirth: '1983-09-07',
    gender: 'Male',
    address: '789 Birch Street, Lakeside',
    postalCode: '23456',
  },
  {
    name: 'Olivia Lopez',
    email: 'Olivia@example.com',
    password: bcrypt.hashSync('password1234', 10),
    dateOfBirth: '1994-12-30',
    gender: 'Female',
    address: '890 Willow Avenue, Riverside',
    postalCode: '76543',
  },
  {
    name: 'Ethan Brown',
    email: 'Ethan@example.com',
    password: bcrypt.hashSync('letmein', 10),
    dateOfBirth: '1987-02-14',
    gender: 'Male',
    address: '234 Oakwood Drive, Brookside',
    postalCode: '34567',
  },
]

export default waitingList
