import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'


const Staff = ({ staff }) => {
  return (
    <Card className='my-3 py-3 rounded'>
      {/* 展示图片 */}
      <Link to={`/staffs/${staff._id}`}>
        <Card.Img src={staff.image} variant='top'></Card.Img>
      </Link>

      <Card.Body>

        {/* 展示图片名 */}
        <Link to={`/staffs/${staff._id}`} style={{ textDecoration: 'none' }}>
          <Card.Title>{staff.name}</Card.Title>
        </Link>

        {/* 因为其他的地方也需要使用商品评价，所以封装为组件来使用 */}
        <Card.Text as='div'>
          <Rating value={staff.rating} text={`${staff.numReviews}条评论`} />
        </Card.Text>



        {/* 展示员工部门 */}
        <Card.Text as='h4' className="CardTextWithMargin">
          {staff.department}
        </Card.Text>

      </Card.Body>
    </Card>
  )
}

export default Staff
