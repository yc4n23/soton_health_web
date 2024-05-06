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

//创建订单reducer
export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true }
    case ORDER_CREATE_SUCCESS:
      return { loading: false, order: action.payload, success: true }
    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

//获取订单reducer
export const orderDetailsReducer = (
  //初始化state的值 
  state = { orderItems: [], },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, loading: true }
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload }
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

//转诊订单
export const transOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_TRANS_REQUEST:
      return { loading: true }
    case ORDER_TRANS_SUCCESS:
      return { loading: false, order: action.payload, success: true }
    case ORDER_TRANS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}



