var moment = require('moment'),
    momentLocales = require('../../../server/helpers/moment.ru.helper.js');

moment.locale( 'ru', momentLocales );

var DayBlock = React.createClass({
        render: function () {
            var date = moment( this.props.date ),
                prefix = '',
                now = moment(new Date()),
                tomorrow = moment(now).date(now.date() + 1);
            if (now.year() === date.year() && now.month() === date.month() && now.date() === date.date()) {
                prefix = 'Сегодня, '
            }
            
            if (tomorrow.year() === date.year() && tomorrow.month() === date.month() && tomorrow.date() === date.date()) {
                prefix = 'Завтра, '
            }
            return (
                <div className={ (date.get('day') == 0 || date.get('day') == 6) ? 'day-block day-block_holiday' : 'day-block' }>{ prefix }{date.get('date')} {date.format('MMMM')}</div>
            );
        }
    });

module.exports = DayBlock;
