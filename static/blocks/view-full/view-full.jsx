var DayBlock = require('../day-block/day-block'),
    ViewMain = require('../view-main/view-main'),
    ViewDaytime = require('../view-daytime/view-daytime');

var ViewFull = React.createClass({
        render: function () {
            var data = this.props.data,
                show = this.props.show;
            
            return (
                <div id="full" className={show ? "fade in active" : "fade"}>
                    <div className="view-full">
                        
                        {data.forecast.map(function(day, i){
                            return <div className="view-full__item">
                                <div className="view-full__day">
                                    <DayBlock date={day.date}></DayBlock>
                                </div>
                                    
                                {(function( scope ){
                                    if ( i === 0 ) {
                                        return <div className="view-full__main">
                                            <ViewMain data={data.now} type="full"></ViewMain>
                                        </div>
                                    }
                                })( this )}
                
                                {day.parts.map(function(part, i){
                                    return <div className="view-full__daytime">
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

module.exports = ViewFull;
