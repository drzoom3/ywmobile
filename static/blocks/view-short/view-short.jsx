var DayBlock = require('../day-block/day-block'),
    ViewMain = require('../view-main/view-main'),
    ViewDaytime = require('../view-daytime/view-daytime');
    
var ViewShort = React.createClass({
        render: function () {
            var data = this.props.data,
                show = this.props.show;
            
            return (
                <div id="short" className="fade in active">
                    <div className="view-short">
                
                        {data.forecast.map(function(day, i){
                            return <div className="view-short__item">
                                <div className="view-short__day">
                                    <DayBlock date={day.date}></DayBlock>
                                </div>
                                    
                                {(function( scope ){
                                    if ( i === 0 ) {
                                        return <div className="view-short__main">
                                            <ViewMain data={data.now} type="short"></ViewMain>
                                        </div>
                                    }
                                })( this )}
                
                                {day.parts.map(function(part, i){
                                    return <div className="view-short__daytime">
                                        <ViewDaytime data={part}></ViewDaytime>
                                    </div>
                                })}
                            </div>                            
                        })}
    
                    </div>
                </div>         
            );
        }
    });

module.exports = ViewShort;
