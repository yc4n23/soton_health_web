import {
  EDIT_DETAIL_FAIL,
  EDIT_DETAIL_REQUEST,
  EDIT_DETAIL_SUCCESS,
  FETCH_ORDERS_FAIL,
  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_SUCCESS,
  STAFF_DETAILS_FAIL,
  STAFF_DETAILS_REQUEST,
  STAFF_DETAILS_SUCCESS,
  STAFF_LIST_FAIL,
  STAFF_LIST_REQUEST,
  STAFF_LIST_SUCCESS,
  CHECK_MEDICAL_REQUEST,
  CHECK_MEDICAL_SUCCESS,
  CHECK_MEDICAL_FAIL,
  FETCH_MEDICAL_REQUEST,
  FETCH_MEDICAL_SUCCESS,
  FETCH_MEDICAL_FAIL
} from "../contents/staffContents"

//初始状态
const initialState = {
  loading: false,
  orders: [],
  error: null,
}

//获取所有职工（医生、见习医生）的reducer
export const staffListReducer = (state = { staffs: [] }, action) => {
  switch (action.type) {
    case STAFF_LIST_REQUEST:
      return { loading: true, staffs: [] }
    case STAFF_LIST_SUCCESS:
      return { loading: false, staffs: action.payload }
    case STAFF_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}


//获取单个医生的reducer
export const staffDetailsReducer = (state = { staff: {} }, action) => {
  switch (action.type) {
    case STAFF_DETAILS_REQUEST:
      return { loading: true, ...state }
    case STAFF_DETAILS_SUCCESS:
      return { loading: false, staff: action.payload }
    case STAFF_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

//获取医生对应的order
export const staffOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDERS_REQUEST:
      return { ...state, loading: true, error: null }
    case FETCH_ORDERS_SUCCESS:
      return { ...state, loading: false, orders: action.payload }
    case FETCH_ORDERS_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

//获取医生对应的修改order
export const editOrdersReducer = (state = { orderDetial: {} }, action) => {
  switch (action.type) {
    case EDIT_DETAIL_REQUEST:
      return { loading: true, error: null }
    case EDIT_DETAIL_SUCCESS:
      return { loading: false, orderDetial: action.payload }
    case EDIT_DETAIL_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

//医生修改order的状态
export const orderUpdateStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ORDER_UPDATE_STATUS_REQUEST':
      return { loading: true }
    case 'ORDER_UPDATE_STATUS_SUCCESS':
      return { loading: false, success: true, order: action.payload }
    case 'ORDER_UPDATE_STATUS_FAIL':
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

//医生写入医疗记录
export const createMedicalReducer = (state = {}, action) => {
  switch (action.type) {
    case CHECK_MEDICAL_REQUEST:
      return { loading: true }
    case CHECK_MEDICAL_SUCCESS:
      return { loading: false, success: true, medical: action.payload }
    case CHECK_MEDICAL_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

//查看患者病例和检查
export const medicalReducer = (state = { medicalHistories: [], loading: false, error: null }, action) => {
  switch (action.type) {
    case FETCH_MEDICAL_REQUEST:
      return { ...state, loading: true }
    case FETCH_MEDICAL_SUCCESS:
      return { ...state, loading: false, medicalHistories: action.payload }
    case FETCH_MEDICAL_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}