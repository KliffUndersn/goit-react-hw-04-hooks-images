import PropTypes from 'prop-types'

const Button = ({clicker}) => {
return (
    <button onClick={clicker} className="Button">load more</button>
)
}

export default Button

Button.propTypes = {
    clicker:PropTypes.func.isRequired,
}