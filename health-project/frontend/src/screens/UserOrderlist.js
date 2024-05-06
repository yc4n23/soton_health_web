import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Card, ListGroup } from 'react-bootstrap'
import { editOrderById, fetchOrdersByStaffId } from '../actions/staffAction'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { fetchOrdersById } from '../actions/userAction'

const StaOrderListScreen = () => {
  const { id: userId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userOrders = useSelector(state => state.userOrders)
  const { loading, error, orders } = userOrders

  useEffect(() => {
    if (userId) {
      dispatch(fetchOrdersById(userId))
    }
  }, [dispatch, userId])

  const getStatusMessage = (status) => {
    switch (status) {
      case 'Scheduled':
        return { variant: 'info', message: 'Scheduled' }
      case 'Ready':
        return { variant: 'success', message: 'Ready' }
      case 'Cancelled':
        return { variant: 'danger', message: 'Cancelled' }
      case 'Transfer':
        return { variant: 'warning', message: 'Transfer' }
      default:
        return { variant: 'secondary', message: 'Unknown' }
    }
  }


  return (
    <div>
      <h1 className="text-center">User Orders for {userId}</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row className="justify-content-center">
          <Col md={10}>
            <ListGroup variant="flush">
              {orders.map(order => (
                <ListGroup.Item key={order._id} className="p-3">
                  <Card className="mb-3 shadow" style={{ cursor: 'pointer' }}>
                    <Card.Header as="h4" className="text-center bg-primary text-white">Order ID: {order._id}</Card.Header>
                    <Card.Body>
                      {order.orderItems.length > 0 ? order.orderItems.map((item, index) => (
                        <Card className="mb-2" key={index}>
                          <Card.Body>
                            <Row>
                              <Col md={4}>

                                <Row>
                                  <Col><strong>User Name:</strong> {order.user.name}</Col>
                                </Row>
                                <Row>
                                  <Col><strong>Date:</strong> {new Date(item.date).toLocaleDateString()}</Col>
                                </Row>
                                <Row>
                                  <Col><strong>Slot:</strong> {item.slot}</Col>
                                </Row>
                              </Col>
                              <Col md={5}>
                                <Row>
                                  <Col><strong>Illness Description:</strong></Col>
                                </Row>
                                <Row>
                                  <Col>{order.illnessDescription}</Col>
                                </Row>
                              </Col>
                              <Col md={3}>
                                <Message {...getStatusMessage(item.status)}>{getStatusMessage(item.status).message}</Message>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      )) : (
                        <Message variant="info">No appointment requests found.</Message>
                      )}
                    </Card.Body>
                  </Card>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      )}
    </div>
  )
}

export default StaOrderListScreen
