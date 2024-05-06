import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap'
import { listStaffDetails } from '../actions/staffAction'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'

const StaffScreen = () => {
  // State for available times and selected date/slot
  const [availableTimes, setAvailableTimes] = useState([])
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedSlot, setSelectedSlot] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()
  const staffDetails = useSelector((state) => state.staffDetails)
  const { loading, error, staff } = staffDetails
  // Handle fetching staff details
  useEffect(() => {
    dispatch(listStaffDetails(id))
  }, [dispatch, id])

  // Update available times when staff details are fetched
  useEffect(() => {
    if (staff && staff.availableTimes) {
      setAvailableTimes(staff.availableTimes.map((time) => ({
        date: time.date.slice(0, 10), // Use just the date part for comparison
        slots: time.slots,
      })))
    }
  }, [staff])

  //添加预约
  const addToAppointmentHandler = () => {
    navigate(`/preappointment/${id}?date=${encodeURIComponent(selectedDate)}&slot=${encodeURIComponent(selectedSlot)}`)
  }

  const selectDate = (date) => {
    setSelectedDate(date)
    setSelectedSlot('') // Reset slot when a new date is selected
  }

  const selectSlot = (slot) => {
    setSelectedSlot(slot)
  }


  // Handle date change
  const handleDateChange = (e) => {
    const newDate = e.target.value
    setSelectedDate(newDate)
    // Reset selected slot
    setSelectedSlot('')
  }

  // Filter slots for the selected date
  const availableSlots = availableTimes.find(time => time.date === selectedDate)?.slots || []



  return (
    <>
      <Link className='btn btn-dark my-3' to='/'>
        Go Back to Homepage
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={staff.image} alt={staff.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{staff.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                {staff.rating && (
                  <Rating
                    value={staff.rating}
                    text={`${staff.numReviews}  reviews`}
                  />
                )}
              </ListGroup.Item>
              <ListGroup.Item><h4>{staff.position}</h4></ListGroup.Item>
              <ListGroup.Item><h4>{staff.department}</h4></ListGroup.Item>
              <ListGroup.Item>

                <Row><h5>{staff.description}</h5></Row>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                {/* ... */}
                <ListGroup.Item>
                  <h4>Available Dates</h4>
                  <Row>
                    {availableTimes.map((time, index) => (
                      <Col key={index} xs={6} md={4}>
                        <Button variant={selectedDate === time.date ? 'success' : 'outline-primary'}
                          onClick={() => selectDate(time.date)}>
                          {time.date}
                        </Button>
                      </Col>
                    ))}
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h4>Available Slots</h4>
                  <Row>
                    {selectedDate && availableTimes.find(time => time.date === selectedDate)?.slots.map((slot, index) => (
                      <Col key={index} xs={6}>
                        <Button variant={selectedSlot === slot ? 'success' : 'outline-secondary'}
                          onClick={() => selectSlot(slot)}
                          disabled={!selectedDate}>
                          {slot}
                        </Button>
                      </Col>
                    ))}
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button onClick={addToAppointmentHandler}
                    className='btn-block'
                    type='button'
                    disabled={!selectedSlot}>
                    添加到预约
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default StaffScreen


