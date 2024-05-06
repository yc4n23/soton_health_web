import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder, transOrder } from '../actions/orderAction'
import { Row, Col, Image, Form, Button, Card } from 'react-bootstrap'
import { addToPreAppointment, removeFromPreApp } from '../actions/preAppointmentAction'
import Message from '../components/Message'
import { setIllnessDescription as setIllnessDescriptionAction } from '../actions/descriptionAction'
import { updateOrderStatus } from '../actions/staffAction'

const PreAppointmentScren = () => {
  const { id: staffId } = useParams() // 获取路由参数中的 id
  const location = useLocation() // 获取当前的 location 对象
  const [appointmentDate, setAppointmentDate] = useState('')
  const [appointmentSlot, setAppointmentSlot] = useState('')
  const [illnessDescription, setIllnessDescription] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const preAppointment = useSelector((state) => state.preAppointment)
  const { preAppointmentItems } = preAppointment || { preAppointmentItems: [] }
  const userInform = useSelector((state) => state.userLogin)
  const { userInfo } = userInform
  const editOrder = useSelector((state) => state.editOrder)
  const { orderDetial } = editOrder


  // 处理文本输入框变化的函数
  const handleDescriptionChange = (e) => {
    setIllnessDescription(e.target.value)
  }

  //拿到从后端传入的state中的order值
  const orderCreate = useSelector((state) => state.orderCreate)
  //解构order的值
  const { order, success, error } = orderCreate

  //如果订单创建成功 就是用useEffect方法进行 页面的重定向
  useEffect(() => {
    if (success) {
      navigate(`/orders/${order._id}`)
    }

  }, [success])

  useEffect(() => {
    // 每当illnessDescription改变时，就更新Redux状态
    dispatch(setIllnessDescriptionAction(illnessDescription))
  }, [illnessDescription, dispatch])


  const checkoutHandler = () => {
    dispatch(setIllnessDescriptionAction(illnessDescription))
    dispatch(
      createOrder({
        preAppointmentItems: preAppointmentItems, // 从Redux状态中获取
        illnessDescription: illnessDescription,

      })
    )
    // navigate('/login?redirect=/preappoinment')

  }



  useEffect(() => {
    // 解析查询字符串参数
    const queryParams = new URLSearchParams(location.search)
    const date = queryParams.get('date')
    const slot = queryParams.get('slot')

    // 如果URL中包含日期和时间段，则设置状态
    if (date && slot) {
      setAppointmentDate(date)
      setAppointmentSlot(slot)
    }
  }, [location.search]) // 依赖项是 location.search，这样任何查询字符串的变化都会触发这个 effect


  useEffect(() => {
    if (staffId) {
      // 使用 appointmentDate 和 appointmentSlot 
      dispatch(addToPreAppointment(staffId, appointmentDate, appointmentSlot))
    }
  }, [dispatch, staffId, appointmentDate, appointmentSlot])





  //删除预约方法
  const removeFromPreAppHandler = (id) => {
    dispatch(removeFromPreApp(id))
  }

  return (

    <Row>
      <Col md={8}>
        <h1>Pre-Appointment List</h1>
        {preAppointmentItems.length === 0 ? (
          <Message>
            Pre-Appointment list is NULL<Link to='/'>GO BACK</Link>
          </Message>
        ) : (
          <Card>
            <Card.Body>
              {preAppointmentItems.map((item) => (
                <Row key={item.staff} className="align-items-center my-3">
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3} className="my-auto">
                    <Link to={`/staffs/${item.staff}`}>{item.name}</Link>
                  </Col>
                  <Col md={2} className="my-auto">{item.position}</Col>
                  <Col md={2} className="my-auto">{appointmentDate}</Col>
                  <Col md={2} className="my-auto">{appointmentSlot}</Col>
                  <Col md={1} className="my-auto">
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => removeFromPreAppHandler(item.staff)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              )
              )
              }
            </Card.Body>
          </Card>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <Card.Body>
            <Form>
              <Form.Group controlId="description">
                <Form.Label>DESCRIPTION</Form.Label>
                <Form.Control
                  as="textarea"
                  style={{ height: '150px' }} // 设置更高的高度
                  value={illnessDescription}
                  onChange={handleDescriptionChange}
                  placeholder="Please describe your condition in detail"
                />
              </Form.Group>
              <Button
                type='button'
                className='btn-block'
                disabled={illnessDescription.trim().length === 0}
                onClick={checkoutHandler}
              >
                Make an appointment
              </Button>

              {/* {userInfo && userInfo.position && (
                <Button
                  type='button'
                  className='btn-block'
                  onClick={Maketransfer}
                >
                  Make a transfer
                </Button>
              )} */}
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>




  )
}

export default PreAppointmentScren
