import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUser } from '../actions/userAction'
import FormContainer from '../components/FormContainer'
import { USER_UPDATE_RESET } from '../contents/userContents'

const UserEditScreen = () => {
  const { id: userId } = useParams()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const [isAdmin, setIsAdmin] = useState(true)
  const [isCheck, setIsCheck] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userUpdate = useSelector((state) => state.userUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      navigate('/admin/userlist')
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
        setIsCheck(user.isCheck)
      }
    }
  }, [dispatch, userId, user, successUpdate])


  //表单提交函数
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser({ _id: userId, name, email, isAdmin, isCheck }))
  }
  return (
    <FormContainer>
      <Link to='/admin/userlist' className='btn btn-dark my-3'>
        BACK
      </Link>
      <h1>Editing the User Interface</h1>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name：</Form.Label>
            <Form.Control
              type='name'
              placeholder='Please enter your name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>E-MAIL：</Form.Label>
            <Form.Control
              type='email'
              placeholder='Please enter your e-mail address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='isadmin'>
            <Form.Check
              type='checkbox'
              label='Is Admin'
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            ></Form.Check>
          </Form.Group>
          <Form.Group controlId='ischeck'>
            <Form.Check
              type='checkbox'
              label='Is Check'
              checked={isCheck}
              onChange={(e) => setIsCheck(e.target.checked)}
            ></Form.Check>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Updated information
          </Button>
        </Form>
      )}
    </FormContainer>
  )
}

export default UserEditScreen