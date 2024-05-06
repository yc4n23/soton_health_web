import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Card, Button } from 'react-bootstrap'
import { editOrderById, updateOrderStatus } from '../actions/staffAction'
import Loader from '../components/Loader'
import Message from '../components/Message'

const EditOrderScreen = () => {
  const { id: orderId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const editOrder = useSelector(state => state.editOrder)
  const { loading, error, orderDetial } = editOrder
  const updateStatusInfo = useSelector(state => state.orderUpdateStatus)
  const { success } = updateStatusInfo

  useEffect(() => {
    dispatch(editOrderById(orderId))
  }, [dispatch, orderId])

  //如果成功 重新发送
  useEffect(() => {
    if (success) {
      dispatch(editOrderById(orderId))
    }
  }, [dispatch, orderId, success])

  const updateStatus = (itemIndex, newStatus) => {
    dispatch(updateOrderStatus(orderId, itemIndex, newStatus))
  }

  const medicalCheck = (orderId) => {

    navigate(`/staffs/orders/${orderId}/check`)
  }


  if (loading) return <Loader />
  if (error) return <Message variant='danger'>{error}</Message>
  if (!orderDetial) return <Message variant='info'>Order not found</Message>

  return (
    <Row className="justify-content-md-center">
      <Col md={6}>
        <Card className="text-center" onClick={() => medicalCheck(orderId)}>
          <Card.Body>
            <Card.Title style={{ fontSize: '24px' }}>{orderDetial.user.name}</Card.Title>
            <Card.Text style={{ fontSize: '20px' }}>
              <a href={`mailto:${orderDetial.user.email}`}>{orderDetial.user.email}</a>
            </Card.Text>
            <Card.Text style={{ fontSize: '20px' }}>illnessDescription:{orderDetial.illnessDescription}</Card.Text>
            <Card.Text style={{ fontSize: '20px' }}>Status: {orderDetial.orderItems[0].status}</Card.Text>
            <Button variant="success" onClick={() => updateStatus(0, 'Scheduled')} className="m-2">Scheduled</Button>
            <Button variant="danger" onClick={() => updateStatus(0, 'Cancelled')} className="m-2">Cancelled</Button>
            <Button variant="warning" onClick={() => updateStatus(0, 'Transfer')} className="m-2">Transfer</Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default EditOrderScreen
