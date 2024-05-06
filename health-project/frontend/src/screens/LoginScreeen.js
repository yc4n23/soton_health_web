import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userAction'
import Message from '../components/Message'
import Loader from '../components/Loader'

import FormContainer from '../components/FormContainer'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin
  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      navigate(redirect) // Adjusted method call
    }
  }, [navigate, userInfo, redirect]) // Updated dependency array

  const submitHandler = (e) => {
    e.preventDefault()
    if (email && password) { // Simple validation example
      dispatch(login(email, password))
    }
  }

  return (
    <FormContainer>
      <h1>LOGIN </h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>E-MAIL</Form.Label>
          <Form.Control
            type='email'
            placeholder='Please enter your e-mail address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>PASS WORD：</Form.Label>
          <Form.Control
            type='password'
            placeholder='Please enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary' disabled={loading}>
          LOGIN
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          new user？
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className="my-custom-link">
            Go to register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen
