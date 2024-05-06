import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Container from 'react-bootstrap/Container'
import { LinkContainer } from 'react-router-bootstrap'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { logout } from '../actions/userAction'

const Header = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  // 退出函数
  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand="lg" className="bg-body-tertiary" collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand className="brand-large">
              Mobile Healthcare Platform
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">

              {/* 只有当用户不是管理员且没有特定职位时才显示Appointment链接 */}
              {(!userInfo || (!userInfo.isAdmin && !userInfo.position)) && (
                <LinkContainer to={`/users/orders/${userInfo?._id}`}>
                  <Nav.Link>
                    <i className="fa-solid fa-stethoscope"></i> Appointment
                  </Nav.Link>
                </LinkContainer>
              )}

              {/* 下拉展示登录状态 */}
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  {/* <LinkContainer to='/profile'>
                    <NavDropdown.Item>个人详情</NavDropdown.Item>
                  </LinkContainer> */}
                  <LinkContainer to={`users/medicalhistory/${userInfo._id}`}>
                    <NavDropdown.Item>Medical history</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    LOG OUT
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i>LOGIN
                  </Nav.Link>
                </LinkContainer>
              )}

              {/* 实现管理员的显示 */}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>User list</NavDropdown.Item>
                  </LinkContainer>


                </NavDropdown>
              )}

              {/* 如果用户有特定职位，展示相关下拉菜单 */}
              {userInfo && userInfo.position && (
                <NavDropdown title={userInfo.position} id='staffmenu'>
                  <LinkContainer to={`/staffs/orders/${userInfo._id}`}>
                    <NavDropdown.Item>My Appointment</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={`/staffs/medicalhistory/${userInfo._id}`}>
                    <NavDropdown.Item>Medicalhistory</NavDropdown.Item>
                  </LinkContainer>
                  {/* <LinkContainer to='/staff/Appointmentlist'>
                    <NavDropdown.Item>完成Appointment</NavDropdown.Item>
                  </LinkContainer> */}
                </NavDropdown>
              )}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
