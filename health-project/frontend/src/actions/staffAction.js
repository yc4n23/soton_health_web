import axios from 'axios'
import {
  CHECK_MEDICAL_FAIL,
  CHECK_MEDICAL_REQUEST,
  CHECK_MEDICAL_SUCCESS,
  EDIT_DETAIL_FAIL,
  EDIT_DETAIL_REQUEST,
  EDIT_DETAIL_SUCCESS,
  FETCH_MEDICAL_FAIL,
  FETCH_MEDICAL_REQUEST,
  FETCH_MEDICAL_SUCCESS,
  FETCH_ORDERS_FAIL,
  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_SUCCESS,
  STAFF_DETAILS_FAIL,
  STAFF_DETAILS_REQUEST,
  STAFF_DETAILS_SUCCESS,
  STAFF_LIST_FAIL,
  STAFF_LIST_REQUEST,
  STAFF_LIST_SUCCESS
} from '../contents/staffContents'

//获取所有医生的action
export const listStaffs = () => async (dispatch) => {
  try {
    dispatch({ type: STAFF_LIST_REQUEST })
    const { data } = await axios.get('/api/staffs')

    dispatch({ type: STAFF_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: STAFF_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

//获取单个医生的action
export const listStaffDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: STAFF_DETAILS_REQUEST })
    const { data } = await axios.get(`/api/staffs/${id}`)

    dispatch({ type: STAFF_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: STAFF_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}


//获取医生对应的order
export const fetchOrdersByStaffId = (id) => async (dispatch, getState) => {
  dispatch({ type: FETCH_ORDERS_REQUEST })
  try {
    // 获取登录成功后的用户信息
    const { userLogin: { userInfo } } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`, // 使用用户的 token
      },
    }
    const { data } = await axios.get(`/api/staffs/orders/${id}`, config)

    dispatch({ type: FETCH_ORDERS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: FETCH_ORDERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

//获取医生对应的编辑order
export const editOrderById = (id) => async (dispatch, getState) => {
  dispatch({ type: EDIT_DETAIL_REQUEST })
  try {
    // 获取登录成功后的用户信息
    const { userLogin: { userInfo } } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`, // 使用用户的 token
      },
    }
    const { data } = await axios.get(`/api/staffs/orders/${id}/edit`, config)

    dispatch({ type: EDIT_DETAIL_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: EDIT_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

//修改患者的订单状态

export const updateOrderStatus = (orderId, itemIndex, status) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'ORDER_UPDATE_STATUS_REQUEST' })

    const { userLogin: { userInfo } } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      },
    }

    const { data } = await axios.put(`/api/staffs/orders/${orderId}/edit`, { itemIndex, status }, config)

    dispatch({
      type: 'ORDER_UPDATE_STATUS_SUCCESS',
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: 'ORDER_UPDATE_STATUS_FAIL',
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}


//修改患者的医疗记录，写入诊断和处方
export const creatMedical = (
  userId,
  staffId,
  medicalPrescription,
  diagnosticResult,
  test,
  date,
) => async (dispatch, getState) => {
  try {
    dispatch({ type: CHECK_MEDICAL_REQUEST })

    //解构页面中的数据
    const { userLogin: { userInfo } } = getState()
    const { editOrder: { orderDetial } } = getState()
    const orderId = orderDetial._id


    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      },
    }
    const body = {
      user: userId,
      staff: staffId,
      medicalPrescription,
      diagnosticResult,
      test,
      date,
    }
    console.log(JSON.stringify(body))
    const { data } = await axios.post(`/api/staffs/orders/${orderId}/check`, body, config)
    dispatch({ type: CHECK_MEDICAL_SUCCESS, payload: data })

  } catch (error) {
    dispatch({
      type: CHECK_MEDICAL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// 查看 Medical History
export const fetchHistory = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: FETCH_MEDICAL_REQUEST })
    const { userLogin: { userInfo } } = getState() // 获取用户的 token

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const response = await axios.get(`/api/staffs/medicalhistory/${id}`, config)
    dispatch({ type: FETCH_MEDICAL_SUCCESS, payload: response.data })
  } catch (error) {
    dispatch({
      type: FETCH_MEDICAL_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}