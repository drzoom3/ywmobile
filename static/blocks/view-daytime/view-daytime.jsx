var ViewDaytime = React.createClass({        
        render: function () {
            var data = this.props.data;
            
            return (
                <div className="view-daytime" style={{"backgroundColor": data.color}}>
                    <div className="view-daytime__daytime">{data.type}</div>
                    <div className="view-daytime__description">
                        <div className="view-daytime__base">
                            <div className="view-daytime__icon"><img src={"http://ekb.shri14.ru/icons/" + data.weather_icon + ".svg"} width="30" height="30" /></div>
                            <div className="view-daytime__min">{data.temp_min>0?"+":""}{data.temp_min || data.temp-1}</div>
                            <div className="view-daytime__max">{data.temp_max>0?"+":""}{data.temp_max || data.temp+1}</div>
                        </div>
                        
                        {(function( scope ){
                            if ( data.weather ) {
                                return <div className="view-daytime__other">
                                    <div className="view-daytime__weather">{data.weather}</div>
                                    <div className="view-daytime__info">Ветер: <span className={"icon-wind icon-wind_"+data.wind_direction}></span> {data.wind}, {data.wind_speed} м/с<br/>Влажность: {data.humidity}%<br/>Давление: {data.pressure} мм рт. ст.</div>
                                </div>
                            }
                        })( this )}
                
                    </div>
                </div>
            );
        }
    });

module.exports = ViewDaytime;
