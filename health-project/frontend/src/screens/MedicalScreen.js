import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { creatMedical } from '../actions/staffAction'

const MedicalScreen = () => {
  const [prescription, setPrescription] = useState('')
  const [result, setResult] = useState('')
  const [test, setTest] = useState('')
  const [date, setDate] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { userInfo } = useSelector(state => state.userLogin)
  const editOrder = useSelector(state => state.editOrder)
  const { loading, error, orderDetial } = editOrder
  // 使用解构来提取数据
  const { user: { _id: userId, name, email, dateOfBirth }, orderItems } = orderDetial
  const staffId = orderItems && orderItems.length > 0 && orderItems[0].staff ? orderItems[0].staff._id : undefined
  const formattedDateOfBirth = new Date(dateOfBirth).toLocaleDateString('en-UK')




  //表单提交函数
  const submitHandler = (e) => {
    e.preventDefault()
    console.log(userId, userInfo._id, prescription, result, test, date)

    dispatch(creatMedical(userId, userInfo._id, prescription, result, test, date)


    )
  }



  return (
    <FormContainer>

      <h1>EDIT MEDICAL HISTORY</h1>

      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Row>
        <Col md={6}>
          <Row>
            <Col md={12}><h4>User Name: </h4></Col>
            <Col md={12}>{name}</Col>
          </Row>
          <Row>
            <Col md={12}>User Email: </Col>
            <Col md={12}><a href={`mailto:${email}`}>{email}</a></Col>
          </Row>
          <Row>
            <Col md={12}><h4>Date of Birth:</h4> </Col>
            <Col md={12}>{formattedDateOfBirth}</Col>
          </Row>
        </Col>
        <Col md={6}>
          <Row>
            <Col md={12}><h4>Illness Description:</h4></Col>
            <Col md={12}>{orderDetial.illnessDescription}</Col>
          </Row>
        </Col>
      </Row>

      <Form onSubmit={submitHandler}>

        <Form.Group controlId='prescription'>
          <Form.Label><h4>Medical Prescription:</h4></Form.Label>
          <Form.Control
            type='prescription'
            placeholder='Please enter prescription'
            value={prescription}
            onChange={(e) => setPrescription(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='result'>
          <Form.Label><h4>Diagnostic Result:</h4></Form.Label>
          <Form.Control
            type='result'
            placeholder='Please enter Result'
            value={result}
            onChange={(e) => setResult(e.target.value)}
          ></Form.Control>
        </Form.Group>


        <Form.Group controlId='test'>
          <Form.Label><h4>Test：</h4></Form.Label>
          <Form.Control
            as='select' // 下拉选择框
            value={test}
            onChange={(e) => setTest(e.target.value)}
          >
            <option value=''>Select </option>
            <option value='Blood test'>Blood test</option>
            <option value='Urine test'>Urine test</option>
            <option value='other'>other</option>
          </Form.Control>
        </Form.Group>


        <Form.Group controlId='date'>
          <Form.Label><h4>Date of Test：</h4></Form.Label>
          <Form.Control
            type='date' // 注意这里使用了 date 类型
            placeholder='Please select a date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' style={{ marginTop: '20px' }}>
          EDIT MEDICAL HISTORY
        </Button>
      </Form>
    </FormContainer>
  )
}

export default MedicalScreen