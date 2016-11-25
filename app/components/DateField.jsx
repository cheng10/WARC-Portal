import React, { Component } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import moment from 'moment';
import _ from 'lodash';
import URLBuilder from '../helpers/URLBuilder.js';

// import 'react-day-picker/lib/style.css';

const overlayStyle = {
    position: 'absolute',
    background: 'white',
    boxShadow: '0 2px 5px rgba(0, 0, 0, .15)',
};
const currentYear = (new Date()).getFullYear();
const fromMonth = new Date(currentYear-80, 0, 1, 0, 0);
const toMonth = new Date(currentYear + 10, 11, 31, 23, 59);

/**
 * Stateless component displaying month component in the form
 *
 * @param {object} object containing the date, methods required for locale, and onchange handler
 * 
 */
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

/**
 * Stateless component displaying DateField component and the calendar popup
 *
 * @extends {React.Component}
 */
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

    /**
     * Stateless component displaying DateField component and the calendar popup
     *
     * @extends {React.Component}
     */
    componentWillUnmount() {
        clearTimeout(this.clickTimeout);
    }

    /**
     * Stateless component displaying DateField component and the calendar popup
     *
     * @extends {React.Component}
     */
    handleContainerMouseDown() {
        this.clickedInside = true;
        // The input's onBlur method is called from a queue right after onMouseDown event.
        // setTimeout adds another callback in the queue, but is called later than onBlur event
        this.clickTimeout = setTimeout(() => {
            this.clickedInside = false;
        }, 0);
    }

    /**
     * Stateless component displaying DateField component and the calendar popup
     *
     * @extends {React.Component}
     */
    handleInputFocus() {
        this.setState({
            showOverlay: true,
        });
    }

/**
 * Stateless component displaying DateField component and the calendar popup
 *
 * @extends {React.Component}
 */
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

    /**
     * Inputhandler for when field is typed in
     *
     * @param {object} event from the input event
     */
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
            this.setQueryParams(moment(momentDay).format('l'));
        } else if (value === "") {
            this.clearDate();
            this.setQueryParams("");
        } else {
            this.setState({ value, selectedDay: null });
        }
    }

    /**
     * Handler for when date in the calendar is clicked on
     *
     * @param {event} event passed in from the click
     * @param {string} day passed in from the click
     */
    handleDayClick(e, day) {
        this.setState({
            value: moment(day).format('l'),
            selectedDay: day,
            showOverlay: false,
        });
        this.setQueryParams(moment(day).format('l'));
        this.input.blur();
    }

  /**
     * Creates and pushes the location given the category selected
     * @param {string} the date selected
     */
    setQueryParams(date) {
        let newquery = {};
        newquery[this.props.param] = date || "";
        let url = _.merge({}, _.omit(this.props.queryParams, ['page']), newquery);
        this.props.dispatch(push(this.props.path.pathname + URLBuilder(url)));
        this.onChange();
    }
    /**
     * Clears date
     *
     */
    clearDate() {
        this.setState({
            selectedDay: "",
            value: ""
        });
    }

    onChange() {
        this.props.dispatch({type: 'docs.onLoad'});
    }
    /**
     * Render function for the datefield
     *
     */
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
