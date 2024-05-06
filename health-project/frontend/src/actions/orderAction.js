import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_TRANS_FAIL,
  ORDER_TRANS_REQUEST,
  ORDER_TRANS_SUCCESS,

} from '../contents/orderContent'
import axios from 'axios'
//创建订单  Action
export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST })

    // 获取登录成功后的用户信息
    const {
      userLogin: { userInfo },
    } = getState()

    // 在尝试使用userInfo之前，确保它不是null
    if (!userInfo) {
      throw new Error('用户未登录。')
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`, // 确保在发送请求前userInfo存在
      },
    }
    const { data } = await axios.post(`/api/orders`, order, config)
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data })
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message

    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: errorMessage,
    })
  }
}

//获取order   Action
export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST })

    //获取登录成功后的用户信息
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/orders/${id}`, config)
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

//修改的订单详情
export const editOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST })


    // 获取登录成功后的用户信息
    const {
      userLogin: { userInfo },
    } = getState()

    // 在尝试使用userInfo之前，确保它不是null
    if (!userInfo) {
      throw new Error('用户未登录。')
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`, // 确保在发送请求前userInfo存在
      },
    }

    const { data } = await axios.get(`/api/orders/${id}`, config)
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}


//医生转诊 创建order
export const transOrder = (order) => async (dispatch, getState) => {
  try {

    dispatch({ type: ORDER_TRANS_REQUEST })

    // 获取登录成功后的用户信息
    const {
      userLogin: { userInfo },
    } = getState()

    // 在尝试使用userInfo之前，确保它不是null
    if (!userInfo) {
      throw new Error('用户未登录。')
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`, // 确保在发送请求前userInfo存在
      },
    }
    dispatch({ type: ORDER_TRANS_REQUEST })

    const { data } = await axios.post(`/api/orders/edit`, order, config)
    dispatch({ type: ORDER_TRANS_SUCCESS, payload: data })
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: ORDER_TRANS_FAIL,
      payload: errorMessage,
    })
  }
}
