import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ListGroup, Row, Col, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getOrderDetails } from '../actions/orderAction'
import Message from '../components/Message'
import Loader from '../components/Loader'

const OrderScreen = () => {
  // 使用 useParams 钩子获取路由参数
  const { id: orderId } = useParams()
  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails


  useEffect(() => {
    // 确保 order 已经定义并且 order._id 不等于 orderId
    if (!order || (order && order._id !== orderId)) {
      dispatch(getOrderDetails(orderId))
    }
    // eslint-disable-next-line
  }, [order, orderId])

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return new Intl.DateTimeFormat({
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(date)
  }


  const getStatusMessage = (status) => {
    switch (status) {
      case 'Scheduled':
        return { variant: 'info', message: 'Scheduled' }
      case 'Completed':
        return { variant: 'success', message: 'Completed' }
      case 'Cancelled':
        return { variant: 'danger', message: 'Cancelled' }
      case 'Ready':
        return { variant: 'warning', message: 'Ready' }
      default:
        return { variant: 'secondary', message: 'Unknow' }
    }
  }


  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : order ? (
    <>
      <h1 className="text-center">Appointment Num：{order._id}</h1>
      <Row className="justify-content-center">
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item className="text-center">
              <h2>Name: {order.user.name}</h2>
              <p>Email: <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
              <h2>Description of the illness or complain</h2>
              <p>{order.illnessDescription}</p>
            </ListGroup.Item>

            <ListGroup.Item className="text-center">
              <h2>Appointment Request Form</h2>
              {order.orderItems.length === 0 ? (
                <Message>Appointment Request Form is Null</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index} className="text-center">
                      <Row className="justify-content-center align-items-center">
                        <Col md={1}>
                          <Image src={item.staff.image} alt={item.staff.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/staffs/${item.staff}`}>{item.staff.name}</Link>
                        </Col>
                        <Col md={3}>
                          <Row>{item.staff.department}</Row>
                          <Row>{item.staff.position}</Row>
                        </Col>

                        <Col md={2}>
                          <Row>
                            <Col>{formatDate(item.date)}</Col>
                            <Col>{item.slot}</Col>
                          </Row>
                        </Col>
                        <Col>
                          <Message {...getStatusMessage(item.status)}>
                            {getStatusMessage(item.status).message}
                          </Message>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>


  ) : (
    <Message>Order is not found.</Message>
  )
}

export default OrderScreen