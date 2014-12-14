var ViewMain = React.createClass({        
        render: function () {
            var data = this.props.data,
                type = this.props.type;
            
            return (
                <div className="view-main" style={{"backgroundColor": data.color}}>
                    <div className="view-main__header">
                        <div className="view-main__header__left"><div className="view-main__temp">{data.temp>0?"+":""}{data.temp}&deg;C</div></div>
                        <div className="view-main__header__right">                            
                            {(function( scope ){
                                if ( type === 'short' ) {
                                    return <div className="view-main__info">Ветер: {data.wind_speed} м/с<br/>Влажность: {data.humidity}%<br/>Давление: {data.pressure} мм рт. ст.</div>
                                } else {
                                    return <div className="view-main__info js-update-timer" id={"update-timer-"+ type}>Только что</div>
                                }
                            })( this )}
                        </div>
                    </div>
                    <div className="view-main__footer">
                        <div className="view-main__footer__left"><div className="view-main__icon"><img src={"http://ekb.shri14.ru/icons/" + data.weather_icon + ".svg"} width="48" height="48" /></div></div>
                        <div className="view-main__footer__right">
                            <div className="view-main__weather">{data.weather}</div>
                            {(function( scope ){
                                if ( type === 'full' ) {                                   
                                    return <div className="view-main__info">
                                            Ветер:  <span className={"icon-wind icon-wind_"+data.wind_direction}></span> {data.wind}, {data.wind_speed} м/с<br/>
                                            Влажность: {data.humidity}%<br/>
                                            Давление: {data.pressure} мм рт. ст.<br/>
                                            Восход: {data.sunrise}&nbsp;&nbsp;&nbsp;&nbsp;Закат: {data.sunset}
                                    </div>
                                }
                            })( this )} 
                        </div>
                    </div>
                </div>
            );
        }
    });

module.exports = ViewMain;
