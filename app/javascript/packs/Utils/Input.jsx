import React, {Component, Fragment} from 'react';

class Input extends Component {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

  this.state = {
    errorMessage: null;
  }
  validate(type){
    .test(event.target.value)

  }
  render() {
    return(
      <Fragment>
        <input
          type="text"
          className={props.classes}
          placeholder={props.placeholder}
          onChange={props.onChange}/>
      </Fragment>
    );
  }
}
export default Input;
