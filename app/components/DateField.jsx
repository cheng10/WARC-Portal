import React, { Component } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import moment from 'moment';

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

export default class DateField extends Component {

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
        const momentDay = moment(value, 'L', true);
        if (momentDay.isValid()) {
            console.log("DATE TYPED", value);
            this.setState({
            selectedDay: momentDay.toDate(),
            value,
            }, () => {
            this.daypicker.showMonth(this.state.selectedDay);
            });
        } else {
            this.setState({ value, selectedDay: null });
        }
    }


    handleDayClick(e, day) {
        console.log("DAY CHANGED", day);
        this.setState({
            value: moment(day).format('L'),
            selectedDay: day,
            showOverlay: false,
        });
        this.input.blur();
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
