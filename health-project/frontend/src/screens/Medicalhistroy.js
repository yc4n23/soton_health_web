import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Container, Row, Col, ListGroup, Card } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { fetchMedicalHistory } from '../actions/userAction'

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toISOString().substring(0, 10) // YYYY-MM-DD format
}

const Medicalhistory = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const medicalHistoryState = useSelector(state => state.userMedical)
  const { medicalHistories, loading, error } = medicalHistoryState

  useEffect(() => {
    if (id) {
      dispatch(fetchMedicalHistory(id))
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
              <Card className="mb-3 w-100 shadow" style={{ cursor: 'pointer' }}>
                <Card.Header className="text-center" style={{ backgroundColor: '#f8f9fa', color: 'white !important', fontWeight: 'bold' }}>
                  <h3>Medical ID: {history._id}</h3>
                </Card.Header>
                <ListGroup variant='flush'>
                  <ListGroup.Item className="text-center">
                    <h4>User: {history.user.name}</h4>
                    <h5>Birth Day: {formatDate(history.user.dateOfBirth)}</h5>
                  </ListGroup.Item>
                  <ListGroup.Item className="text-center">
                    <h4>Staff: {history.staff}</h4>
                  </ListGroup.Item>
                  <ListGroup.Item className="text-center">
                    <h4>Test: {history.test}</h4>
                  </ListGroup.Item>
                  <ListGroup.Item className="text-center">
                    <h4>Medical Prescription: {history.medicalPrescription}</h4>
                  </ListGroup.Item>
                  <ListGroup.Item className="text-center">
                    <h4>Diagnostic Result: {history.diagnosticResult}</h4>
                  </ListGroup.Item>
                  <ListGroup.Item className="text-center">
                    <h4>Date: {formatDate(history.date)}</h4>
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

export default Medicalhistory
