import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Alert } from 'react-bootstrap'
import Staff from '../components/Staff'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listStaffs } from '../actions/staffAction'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const staffList = useSelector((state) => state.staffList)
  const { loading, error, staffs } = staffList
  useEffect(() => {
    dispatch(listStaffs())
  }, [dispatch])


  return (
    <>
      <h1>  Medical Teams</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {staffs.map((staff) => (
            <Col key={staff._id} sm={12} md={6} lg={4} xl={3}>
              <Staff staff={staff} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default HomeScreen

