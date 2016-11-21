import React, { Component } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import moment from 'moment';
import _ from 'lodash';
import URLBuilder from '../helpers/URLBuilder.js';

import 'react-day-picker/lib/style.css';

const overlayStyle = {
    position: 'absolute',
    background: 'white',
    boxShadow: '0 2px 5px rgba(0, 0, 0, .15)',
};
const currentYear = (new Date()).getFullYear();
const fromMonth = new Date(currentYear-50, 0, 1, 0, 0);
const toMonth = new Date(currentYear + 10, 11, 31, 23, 59);

// Component will receive date, locale and localeUtils props
function YearMonthForm({ date, localeUtils, onChange }) {
  const months = localeUtils.getMonths();
  const years = [];
  for (let i = fromMonth.getFullYear(); i <= new Date().getFullYear(); i++) {
    years.push(i);
  }

  const handleChange = function handleChange(e) {
    const { year, month } = e.target.form;
    onChange(new Date(year.value, month.value));
  };

  return (
    <form className="DayPicker-Caption">
      <select name="month" onChange={ handleChange } value={ date.getMonth() }>
        { months.map((month, i) =>
          <option key={ i } value={ i }>
            { month }
          </option>)
        }
      </select>
      <select name="year" onChange={ handleChange } value={ date.getFullYear() }>
        { years.map((year, i) =>
          <option key={ i } value={ year }>
            { year }
          </option>)
        }
      </select>
    </form>
  );
}

class DateField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showOverlay: false,
            value: '',
            selectedDay: null,
            initialMonth: new Date(),
        };

        this.input = null;
        this.daypicker = null;
        this.clickedInside = false;
        this.clickTimeout = null;
        this.handleDayClick = this.handleDayClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputFocus = this.handleInputFocus.bind(this);
        this.handleInputBlur = this.handleInputBlur.bind(this);
        this.handleContainerMouseDown = this.handleContainerMouseDown.bind(this);
    }

    componentWillUnmount() {
        clearTimeout(this.clickTimeout);
    }

    handleContainerMouseDown() {
        this.clickedInside = true;
        // The input's onBlur method is called from a queue right after onMouseDown event.
        // setTimeout adds another callback in the queue, but is called later than onBlur event
        this.clickTimeout = setTimeout(() => {
            this.clickedInside = false;
        }, 0);
    }

    handleInputFocus() {
        this.setState({
            showOverlay: true,
        });
    }

    handleInputBlur() {
        const showOverlay = this.clickedInside;

        this.setState({
            showOverlay,
        });

        // Force input's focus if blur event was caused by clicking on the calendar
        if (showOverlay) {
            this.input.focus();
        }
    }

    handleInputChange(e) {
        const { value } = e.target;
        const momentDay = moment(value, 'l', true);
        if (momentDay.isValid()) {
            this.setState({
            selectedDay: momentDay.toDate(),
            value,
            }, () => {
                this.daypicker.showMonth(this.state.selectedDay);
            });
            this.setQueryParams(momentDay);
        } else if (value === "") {
            this.setQueryParams("");
        } else {
            this.setState({ value, selectedDay: null });
        }
    }


    handleDayClick(e, day) {
        console.log("DAY CHANGED", day);
        this.setState({
            value: moment(day).format('l'),
            selectedDay: day,
            showOverlay: false,
        });
        this.setQueryParams(moment(day).format('l'));
        this.input.blur();
    }

    setQueryParams(date) {
        let newquery = {};
        newquery[this.props.param] = date || "";
        console.log(date);
        let url = _.merge({}, _.omit(this.props.queryParams, ['page']), newquery);
        this.props.dispatch(push(this.props.path.pathname + URLBuilder(url)));
        this.onChange();
    }

    clearDate() {
        this.setState({
            selectedDay: "",
            value: ""
        });
    }

    onChange() {
        this.props.dispatch({type: 'docs.onLoad'});
    }

    render() {
        return (
            <div onMouseDown={ this.handleContainerMouseDown }>
                <input
                    className="date-input"
                    type="text"
                    ref={ el => { this.input = el; } }
                    placeholder = {this.props.placeholder || "Date"}
                    value={ this.state.value }
                    onChange={ this.handleInputChange }
                    onFocus={ this.handleInputFocus }
                    onBlur={ this.handleInputBlur }
                />
                
                { this.state.showOverlay &&
                    <div style={ { position: 'relative', zIndex: 99 } }>
                    <div style={ overlayStyle }>
                        <DayPicker
                            initialMonth={ this.state.initialMonth }
                            fromMonth={ fromMonth }
                            toMonth={ toMonth }
                            ref={ el => { this.daypicker = el; } }
                            onDayClick={ this.handleDayClick }
                            selectedDays={ day => DateUtils.isSameDay(this.state.selectedDay, day) }
                            captionElement={
                                <YearMonthForm onChange={ initialMonth => this.setState({ initialMonth }) } />
                            }
                        />
                    </div>
                </div>
            }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        page: Number(state.routing.locationBeforeTransitions.query.page) || 1,
        queryParams: state.routing.locationBeforeTransitions.query || '',
        path: state.routing.locationBeforeTransitions || ''
    };
}

export default connect(mapStateToProps)(DateField);
