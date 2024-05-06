import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  createMedicalReducer,
  editOrdersReducer,
  medicalReducer,
  orderUpdateStatusReducer,
  staffDetailsReducer,
  staffListReducer,
  staffOrdersReducer
} from './reducers/staffReducer'
import {
  medicalHistoryReducer,
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userOrdersReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from './reducers/userReducer'
import { preAppointmentReducer } from './reducers/preAppointmentReducer'
import {
  orderCreateReducer,
  orderDetailsReducer,
  transOrderReducer,
} from './reducers/orderReducer'
const reducer = combineReducers({
  staffList: staffListReducer,
  staffDetails: staffDetailsReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userDelete: userDeleteReducer,
  userList: userListReducer,
  preAppointment: preAppointmentReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  staffOrders: staffOrdersReducer,
  userOrders: userOrdersReducer,
  editOrder: editOrdersReducer,
  orderUpdateStatus: orderUpdateStatusReducer,
  transOrder: transOrderReducer,
  userUpdate: userUpdateReducer,
  userUpdateProfile: userUpdateProfileReducer,
  medicalHistroy: createMedicalReducer,
  userMedical: medicalHistoryReducer,
  staffMedical: medicalReducer,
})



//获取本地存储的预约表的信息
const preAppointmentItemsFromStorage = localStorage.getItem('preAppointmentItems')
  ? JSON.parse(localStorage.getItem('preAppointmentItems'))
  : []

//获取本地存储的登录用户信息
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

//初始化state值
const initialState = {
  preAppointment: {
    preAppointmentItems: preAppointmentItemsFromStorage,
    illnessDescription: JSON.parse(localStorage.getItem('illnessDescription')) || '',
  },
  userLogin: { userInfo: userInfoFromStorage },
}



const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store