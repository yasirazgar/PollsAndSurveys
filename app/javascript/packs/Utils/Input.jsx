import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const regexs = {
  email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
}
const errors = {
  email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
}
class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: null
    };
    this.validateWithRegex = this.validateWithRegex.bind(this)
    this.valid = true
  }

  validateWithRegex = (event) => {
    const regex = regexs[this.props.type]
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
        if (this.props.type && (this.valid != valid)){
          this.setState({errorMessage: this.props.translations[this.props.type + '_error']});
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

const mapStateToProps = state => {
  return {
    translations: state.translations
  }
}

export default connect(mapStateToProps)(Input);
