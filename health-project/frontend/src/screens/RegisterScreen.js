import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userAction'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'

const RegisterScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [gender, setGender] = useState('')
  const [address, setAddress] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [message, setMessage] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo, message: waitMessage } = userRegister
  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      setMessage(userInfo.message) // 使用 userInfo 中的 message 更新本地状态
      // 如果需要的话，可以在这里弹出 alert
      alert(userInfo.message)
      navigate(redirect)
    }
  }, [userInfo, navigate, redirect])

  //表单提交函数
  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Password mismatch')
    } else {
      // 确保所有字段都传递到 register action

      dispatch(register(name, email, password, dateOfBirth, gender, address, postalCode))
    }
  }



  return (
    <FormContainer>
      <h1>Register</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Name：</Form.Label>
          <Form.Control
            type='name'
            placeholder='Please enter your name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='email'>
          <Form.Label>E-mail：</Form.Label>
          <Form.Control
            type='email'
            placeholder='Please enter your e-mail address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password：</Form.Label>
          <Form.Control
            type='password'
            placeholder='Please enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm password:</Form.Label>
          <Form.Control
            type='password'
            placeholder='confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='dateOfBirth'>
          <Form.Label>Date of Birth：</Form.Label>
          <Form.Control
            type='date' // 注意这里使用了 date 类型
            placeholder='Please select a date'
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='gender'>
          <Form.Label>Gender：</Form.Label>
          <Form.Control
            as='select' // 下拉选择框
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value=''>Select gender</option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
            <option value='other'>other</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId='address'>
          <Form.Label>Address：</Form.Label>
          <Form.Control
            type='text'
            placeholder='addres'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='postalCode'>
          <Form.Label>postalCode：</Form.Label>
          <Form.Control
            type='text'
            placeholder='please enter your postalCode'
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Regist
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          Already have an account?？
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Go to login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen