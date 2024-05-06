import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  FETCH_MEDICAL_HISTORY_REQUEST,
  FETCH_MEDICAL_HISTORY_SUCCESS,
  FETCH_MEDICAL_HISTORY_FAIL,
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAIL,
} from '../contents/userContents'
import axios from 'axios'

//用户登录Action
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST })


    //设置传递的数据类型是jason类型
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    )
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
    //本地存储信息
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

//用户退出的action
export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({ type: USER_LOGOUT })
}

// 用户注册 Action
export const register = (name, email, password, dateOfBirth, gender, address, postalCode) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const body = {
      name,
      email,
      password,
      dateOfBirth,
      gender,
      address,
      postalCode,
    }

    const { data } = await axios.post('/api/users', body, config)
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

//用户详情Action
export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST })

    //获取登录成功后的用户信息
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        //进行授权，拿到用户的token值
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    //因为现在是查看用户详情，所示是get方法
    const { data } = await axios.get(`/api/users/${id}`, config)
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

//更新用户详情Action
export const updateUserDetails = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST })

    //获取登录成功后的用户信息
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/users/profile`, user, config)
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data })

    //重新发送一遍 login_success ，更改一下userinfo的数据信息
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

//用户列表Action
export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST })

    //获取登录成功后的用户信息
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/users`, config)
    dispatch({ type: USER_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

//删除用户Action
export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST })

    //获取登录成功后的用户信息
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.delete(`/api/users/${id}`, config)
    dispatch({ type: USER_DELETE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

//更新用户资料Action
export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST })

    //获取登录成功后的用户信息
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/users/${user._id}`, user, config)
    dispatch({ type: USER_UPDATE_SUCCESS })
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}


// 查看 Medical History
export const fetchMedicalHistory = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: FETCH_MEDICAL_HISTORY_REQUEST })
    const { userLogin: { userInfo } } = getState() // 获取用户的 token

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const response = await axios.get(`/api/users/medicalhistory/${id}`, config)
    dispatch({ type: FETCH_MEDICAL_HISTORY_SUCCESS, payload: response.data })
  } catch (error) {
    dispatch({
      type: FETCH_MEDICAL_HISTORY_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

//获取医生对应的order
export const fetchOrdersById = (id) => async (dispatch, getState) => {
  dispatch({ type: FETCH_REQUEST })
  try {
    // 获取登录成功后的用户信息
    const { userLogin: { userInfo } } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`, // 使用用户的 token
      },
    }
    const { data } = await axios.get(`/api/users/orders/${id}`, config)

    dispatch({ type: FETCH_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: FETCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}