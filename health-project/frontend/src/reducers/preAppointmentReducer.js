import { SET_ILLNESS_DESCRIPTION } from '../contents/descriptionContent'
import {
  PREAPPOINTMENT_ADD_ITEM,
  PREAPPOINTMENT_REMOVE_ITEM,
} from '../contents/preAppointmentContent'

// 确保 initialState 完整定义，没有任何 undefined 的属性
const initialState = {
  preAppointmentItems: [],
  illnessDescription: '',
}

export const preAppointmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case PREAPPOINTMENT_ADD_ITEM:
      const item = {
        ...action.payload,

      }
      const existItem = state.preAppointmentItems.find(x => x.staff === item.staff)

      if (existItem) {
        return {
          ...state,
          preAppointmentItems: state.preAppointmentItems.map(x =>
            x.staff === existItem.staff ? item : x
          ),
        }
      } else {
        return {
          ...state,
          preAppointmentItems: [...state.preAppointmentItems, item],
        }
      }
    case PREAPPOINTMENT_REMOVE_ITEM:
      return {
        ...state,
        preAppointmentItems: state.preAppointmentItems.filter(x => x.staff !== action.payload),
      }

    case SET_ILLNESS_DESCRIPTION:
      return {
        ...state,
        illnessDescription: action.payload,
      }
    default:
      return state
  }
}
