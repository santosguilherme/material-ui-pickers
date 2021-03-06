import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { TextField } from 'material-ui';

export default class DateTextField extends PureComponent {
  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
      PropTypes.number,
      PropTypes.instanceOf(Date),
    ]),
    disabled: PropTypes.bool,
    format: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    invalidLabel: PropTypes.string,
    labelFunc: PropTypes.func,
  }

  static defaultProps = {
    disabled: false,
    invalidLabel: 'Unknown',
    value: new Date(),
    labelFunc: undefined,
    format: undefined,
  }

  getDisplayDate = () => {
    const {
      value,
      format,
      invalidLabel,
      labelFunc,
    } = this.props;

    const date = moment(value);

    if (labelFunc) {
      return labelFunc(date, invalidLabel);
    }

    return date.isValid()
      ? date.format(format)
      : invalidLabel;
  }

  handleChange = () => {
    console.warn('Currently not supported keyboad input');
  }

  handleFocus = (e) => {
    e.target.blur();
    e.stopPropagation();
    e.preventDefault();
    const { disabled, onClick } = this.props;

    if (!disabled) {
      onClick(e);
    }
  }

  render() {
    const {
      value, format, disabled, onClick, invalidLabel, labelFunc, ...other
    } = this.props;

    return (
      <TextField
        readOnly
        value={this.getDisplayDate()}
        onChange={this.handleChange}
        onClick={this.handleFocus}
        onKeyPress={this.handleFocus}
        onBlur={e => e.preventDefault() && e.stopPropagation()}
        disabled={disabled}
        {...other}
      />
    );
  }
}
