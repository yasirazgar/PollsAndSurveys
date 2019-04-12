import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  constructor(props) {
    super(props);

    this.emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    this.passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
    this.state = {
      errorMessage: null
    };
    this.validateWithRegex = this.validateWithRegex.bind(this)
    this.valid = true
  }

  validateWithRegex = (event) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
    const emailError = 'Invalid email'
    const passwordError = 'Invalid password'
    const regex = eval(this.props.type+'Regex');
    const value = event.target.value;

    if (!regex){
      if (this.props.setFormValidity){
        this.props.setFormValidity(this.props.name, value)
      }
    }
    else{
      const valid = regex.test(value);

      if (valid){
        this.setState({errorMessage: null});
        if (this.props.setFormValidity){
          this.props.setFormValidity(this.props.name, value, valid)
        }
      }
      else{
        if (this.valid != valid){
          this.setState({errorMessage: eval(this.props.type+'Error')});
        }
      }
      this.valid = valid
    }

  }

  render() {
    let changeHandler = this.props.onChange;
    let errorSpan;
    if (!changeHandler){
      changeHandler = this.validateWithRegex;
    }
    if (this.state.errorMessage) {
      errorSpan = <span className='error-message'> {this.state.errorMessage} </span>
    }

    return(
      <Fragment>
        <input
          type={this.props.type || 'text'}
          name={this.props.name}
          className={this.props.classes}
          placeholder={this.props.placeholder}
          onChange={changeHandler}/>

        {errorSpan}
      </Fragment>

    );
  }
}

Input.propTypes = {
  type: PropTypes.string,
  onChange: PropTypes.func,
  validateWithRegex: PropTypes.func,
  setFormValidity: PropTypes.func,
  type: PropTypes.string,
  name: PropTypes.string,
  classes: PropTypes.string,
  placeholder: PropTypes.string,
  changeHandler: PropTypes.func,

}

export default Input;
