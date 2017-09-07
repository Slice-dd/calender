import React from 'react';
import moment from 'moment';
import './DatePickers.less';

export default class DatePickers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nowDate: this.props.nowDate,
            year: null,
            month: null,
            firstDayInMonth: null,
            daysInMonth: null
        }
    }

    componentWillMount() {
        const { nowDate } = this.state;
        this.resolveDate(nowDate);
    }

    componentWillReceiveProps(nextProps , newState) {
        this.resolveDate( nextProps.nowDate);
    }

    resolveDate = (nowDate) => {

        const date = moment(nowDate);
        const year = date.get('year');
        const month = date.get('month');
        const firstDayInMonth = moment([year, month, 1]).get('day');
        const daysInMonth = date.daysInMonth();

        this.setState({year, month, firstDayInMonth, daysInMonth});
    } 

    getCalendarDays({firstDayInMonth, daysInMonth, shouldNextMonthDays, daysInPrevMonth}) {

        const allDays = [], tdArray = [];
        debugger
        for(let i = firstDayInMonth ;  i-- ;) {
            allDays.push(daysInPrevMonth - i );
        }

        for(let j = 1 ; j <= daysInMonth ; j++) {
            allDays.push(j);
        }

        for(let k = 1 ; k <= shouldNextMonthDays ; k++) {
            allDays.push(k);
        }

        for(let l = 0 ; l < 6 ; l++) {
            tdArray.push(allDays.slice(l*7, l*7+7));
        }
     
        return tdArray;

    }

    handleDateClick = (index, firstDayInMonth, daysInMonth, items) => {

        const { year , month } = this.state;

        switch(true) {

            case index > (firstDayInMonth-1) &&  index < (daysInMonth + firstDayInMonth) : 
                this.props.dateClick(year, month+1, items);
                break;
                
            case index < firstDayInMonth :
                // debugger
                this.resolveDate(moment([year, month]).subtract(1, 'months'));
                break;

            case index > ( firstDayInMonth + daysInMonth ) -1 :
                // debugger
                this.resolveDate(moment([year, month]).add(1, 'months'));
                break;
        }

    }

    judgeDate({m, firstDayInMonth, daysInMonth, toDay, month, year, items}) {
        const nowMonth = m > (firstDayInMonth-1) &&  m < (daysInMonth + firstDayInMonth);
        switch(true) {
            case items === toDay && nowMonth && month === moment().get('month') && year === moment().get('year') :
                return "calendar-cell calendar-cell-today";
            case nowMonth: 
                return "calendar-cell";
            default:
                return "calendar-cell calendar-cell-othermonth"
        }
    }

    render() {
        
        //获取当月天数，上月天数等日期信息
        const { firstDayInMonth, daysInMonth, year, month } = this.state;
        const shouldNextMonthDays = 42 - firstDayInMonth - daysInMonth;
        const daysInPrevMonth = moment(moment([year,month]).subtract(1, 'months')).daysInMonth();
        const toDay = moment().get('date');
        
        //获取每行显示的日历
        const tdArray = this.getCalendarDays({firstDayInMonth, daysInMonth, shouldNextMonthDays, daysInPrevMonth});
                
        return (
            <table className="eoa-table">
                <thead>
                    <tr>
                        <th className="calendar-head">周日</th>
                        <th className="calendar-head">周一</th>
                        <th className="calendar-head">周二</th>
                        <th className="calendar-head">周三</th>
                        <th className="calendar-head">周四</th>
                        <th className="calendar-head">周五</th>
                        <th className="calendar-head">周六</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tdArray.map((item ,i) => {
                            return (
                                <tr key={item + Math.random() }>
                                    {item.map((items, index) => {

                                        const m = i*7 + index;
                                         
                                        return (
                                            <td 
                                                key={items + Math.random()} 
                                                className={this.judgeDate({m, firstDayInMonth, daysInMonth, toDay, month, year, items}) } 
                                                onClick={() => this.handleDateClick( m, firstDayInMonth, daysInMonth, items )}
                                            >
                                                <div className="calendar-date">{items}</div>
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        )
    }
}