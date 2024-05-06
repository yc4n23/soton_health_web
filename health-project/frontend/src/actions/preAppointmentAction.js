import axios from 'axios'
import {
  PREAPPOINTMENT_ADD_ITEM,
  PREAPPOINTMENT_REMOVE_ITEM,

} from '../contents/preAppointmentContent'

//添加预约的action
export const addToPreAppointment = (id, date, slot) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/staffs/${id}`)

  dispatch({
    type: PREAPPOINTMENT_ADD_ITEM,
    payload: {
      staff: data._id,
      name: data.name,
      image: data.image,
      position: data.position,
      date,
      slot,
    },
  })
  // //将购买物品添加到本地存储
  localStorage.setItem('preAppointmentItems', JSON.stringify(getState().preAppointment.preAppointmentItems))
}


//删除预约医生的action
export const removeFromPreApp = (id) => async (dispatch, getState) => {
  dispatch({
    type: PREAPPOINTMENT_REMOVE_ITEM,
    payload: id,
  })
  localStorage.setItem('preAppointmentItems', JSON.stringify(getState().preAppointment.preAppointmentItems))
}

