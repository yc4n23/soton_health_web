import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserDetails } from '../actions/userAction'
import { USER_UPDATE_PROFILE_RESET } from '../contents/userContents'

const ProfileScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()


  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user, } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else {
      if (!user || !user.name || success) { // 检查 user 是否已定义，以及 user.name 是否存在
        //显示更改之后的用户数据
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, navigate, userInfo, user])
  //表单提交函数(更新用户资料)
  const submitHandler = (e) => {
    e.preventDefault()
    //dispatch update profile函数
    dispatch(updateUserDetails({ id: user._id, name, email, password }))
  }
  return (
    <Row>
      <Col md={3}>
        <h2>Profile</h2>
        {success && <Message variant='success'>success！</Message>}
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
              placeholder='please enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='confirmPassword'>
            <Form.Label>confirm your password：</Form.Label>
            <Form.Control
              type='password'
              placeholder='confirm your password：'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type='submit' variant='primary'>
            Update
          </Button>
        </Form>
      </Col>
    </Row>
  )
}

export default ProfileScreen