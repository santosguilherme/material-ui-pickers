import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DomainPropTypes from '../constants/prop-types';

/* eslint-disable react/sort-comp */
export default class PickerBase extends PureComponent {
  static propTypes = {
    value: DomainPropTypes.date,
    onChange: PropTypes.func.isRequired,
    autoOk: PropTypes.bool,
    returnMoment: PropTypes.bool,
    format: PropTypes.string,
    labelFunc: PropTypes.func,
    ampm: PropTypes.bool,
  }

  static defaultProps = {
    value: new Date(),
    autoOk: false,
    returnMoment: false,
    labelFunc: undefined,
    format: undefined,
    ampm: true,
  }

  getValidDateOrCurrent = () => {
    const date = moment(this.props.value);

    return date.isValid() ? date : moment();
  }

  state = {
    date: this.getValidDateOrCurrent(),
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.value !== prevProps.value) {
      this.setState({ date: this.getValidDateOrCurrent() });
    }
  }

  handleAccept = () => {
    const dateToReturn = this.props.returnMoment
      ? this.state.date
      : this.state.date.toDate();

    this.props.onChange(dateToReturn);
  }

  handleDismiss = () => {
    this.setState({ date: this.getValidDateOrCurrent() });
  }

  handleChange = (date, isFinish = true) => {
    this.setState({ date }, () => {
      if (isFinish && this.props.autoOk) {
        this.handleAccept();
        this.togglePicker();
      }
    });
  }

  togglePicker = () => {
    this.wrapper.togglePicker();
  }

  getFormat = () => {
    if (this.props.format || this.props.labelFunc) {
      return this.props.format;
    }

    return this.props.ampm
      ? this.default12hFormat
      : this.default24hFormat;
  }

  handleClear = () => {
    this.props.onChange(null);
  }
}
