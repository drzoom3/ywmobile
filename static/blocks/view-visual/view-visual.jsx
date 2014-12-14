var DayBlock = require('../day-block/day-block'),
    ViewMain = require('../view-main/view-main'),
    ViewDaytime = require('../view-daytime/view-daytime'),
    moment = require('moment'),
    momentLocales = require('../../../server/helpers/moment.ru.helper.js');

moment.locale( 'ru', momentLocales );

var ViewVisual = React.createClass({
        render: function () {
            var data = this.props.data,
                show = this.props.show;
            
            return (
                <div id="visual" className={show ? "fade in active" : "fade"}>
                    <div className="view-visual">
                        <div className="view-visual__main">
                           <ViewMain data={data.now} type="visual"></ViewMain>
                        </div>
                
                        <div className="view-visual__days">
                            {data.forecast.map(function(item, i){
                                var max = data.max,
                                    min = data.min,
                                    height = (Math.abs(Math.abs(item.temp - min)*70/Math.abs(max - min)) + 60),
                                    style = {
                                      height: height +'px',
                                      background: item.color
                                    },
                                    date = moment( item.date );
                
                                return <div className={ item.temp >= 0 ? 'view-visual__item view-visual__item_plus': 'view-visual__item view-visual__item_minus'} key={"3-"+i}>
                                   <div className="view-visual__bar" style={style}>
                                       <div className="view-visual__temp">{item.temp>0?"+":""}{item.temp}</div>
                                   </div>
                                   <div className="view-visual__weather">                           
                                       <div className="view-visual__icon"><img src={"http://ekb.shri14.ru/icons/" + item.weather_icon + ".svg"} width="25" height="25" title={item.weather} alt={item.weather} /></div>
                                       <div className={( (date.get('day') == 0 || date.get('day') == 6) ? 'view-visual__day view-visual__day_holiday': 'view-visual__day' )}>{date.format('dd')}</div>
                                   </div>
                               </div>
                            })}
                        </div>
                        
                    </div>
                </div>
            );
        }
    });

module.exports = ViewVisual;
