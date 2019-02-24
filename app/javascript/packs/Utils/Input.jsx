import React, {Component, Fragment} from 'react';

class Input extends Component {
  // const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  // const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

  constructor() {
    super();

    this.emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    this.passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
  }

  state = {
    errorMessage: null
  };

  validateWithRegex = (event) => {
    this.setState({errorMessage: null});

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
    const emailError = 'Invalid email'
    const passwordError = 'Invalid password'
    const regex = eval(this.props.type+'Regex');
    const value = event.target.value;

    if (!value || regex.test(value)) {
      this.setState({errorMessage: null});
      this.props.setFormValidity(this.props.type, true, value)
    }
    else{
      this.setState({errorMessage: eval(this.props.type+'Error')});
      this.props.setFormValidity(this.props.type, false, value)
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
          className={this.props.classes}
          placeholder={this.props.placeholder}
          onChange={changeHandler}/>

        {errorSpan}
      </Fragment>
    );
  }
}

export default Input;
