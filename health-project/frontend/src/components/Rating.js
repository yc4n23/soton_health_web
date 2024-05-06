import React from 'react'
import propTypes from 'prop-types'//限制传入属性的数据类型‘value’、‘text’

const Rating = ({ value, text }) => {
  return (
    <div className="rating">
      <span>
        <i className={
          value >= 1
            ? 'fas fa-star'
            : value >= 0.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'}>
        </i>
      </span>
      <span>
        <i className={
          value >= 2
            ? 'fas fa-star'
            : value >= 1.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'}>
        </i>
      </span>
      <span>
        <i className={
          value >= 3
            ? 'fas fa-star'
            : value >= 2.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'}>
        </i>
      </span>
      <span>
        <i className={
          value >= 4
            ? 'fas fa-star'
            : value >= 3.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'}>
        </i>
      </span>
      <span>
        <i className={
          value >= 5
            ? 'fas fa-star'
            : value >= 4.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'}>
        </i>
      </span>
      <span>
        {text ? text : ''}
        {/* 精简版 */}
        {/* {text && text} */}
      </span>
    </div >
  )
}
// Rating.defaultProps = {
//   color: '#f8e825'
// }
Rating.propTypes = {
  value: propTypes.number.isRequired,
  text: propTypes.string.isRequired,
}
export default Rating
