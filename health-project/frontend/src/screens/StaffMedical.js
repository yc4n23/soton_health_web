import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Container, Row, Col, ListGroup, Card } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { fetchHistory } from '../actions/staffAction'

const formatDate = (dateString) => {
  if (!dateString) return 'No Date' // Handle empty or undefined input
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return 'Invalid Date' // Check if the date is valid
  return date.toISOString().substring(0, 10) // YYYY-MM-DD format
}

const StaffMedical = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const medicalHistoryState = useSelector(state => state.staffMedical)
  const { medicalHistories, loading, error } = medicalHistoryState

  useEffect(() => {
    if (id) {
      dispatch(fetchHistory(id))
    }
  }, [dispatch, id])

  return (
    <Container className="d-flex flex-column align-items-center">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row className="w-100">
          {medicalHistories.map(history => (
            <Col md={12} key={history._id} className="d-flex justify-content-center">
              <Card className="mb-3 w-100 shadow-sm">
                <ListGroup variant='flush'>
                  <ListGroup.Item className="text-center" style={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>
                    <h3>Medical ID: </h3>{history._id}
                  </ListGroup.Item>
                  <ListGroup.Item className="text-center" >
                    <h4>User: </h4>{history.user.name}
                    <h4>E-mail:</h4> <a href={`mailto:${history.user.email}`}>{history.user.email}</a>
                  </ListGroup.Item>
                  <ListGroup.Item className="text-center" >
                    <h4>Staff: {history.staff.name}</h4>
                    <h5>Email: </h5>{history.staff.email}
                  </ListGroup.Item>
                  <ListGroup.Item className="text-center" >
                    <h4>Test: </h4>{history.test}
                  </ListGroup.Item>
                  <ListGroup.Item className="text-center" >
                    <h4>Medical Prescription: </h4>{history.medicalPrescription}
                  </ListGroup.Item>
                  <ListGroup.Item className="text-center" >
                    <h4>Diagnostic Result: </h4>{history.diagnosticResult}
                  </ListGroup.Item>
                  <ListGroup.Item className="text-center">
                    <h4>Date: </h4>{history.date ? formatDate(history.date) : 'No Date Available'}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  )
}

export default StaffMedical
