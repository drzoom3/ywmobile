var Tabs = React.createClass({
        render: function () {
            var data = this.props.data || {},
                type = data.type || "short",
                id = data.id || 0;
            
            return (
                <div className="tabs-block">
                    <ul className="tabs" role="tablist">
                        <li className={type == "short" ? "tabs__item active" : "tabs__item"}>
                           {(function( scope ){
                                if ( id === 0 ) {
                                    return <a className="tabs__link" href="#short" data-toggle="tab" role="tab" aria-controls="short" aria-expanded="true">Кратко</a>
                                } else {
                                    return <a className="tabs__link" href={"/" + id + "/short"}>Кратко</a>                                    
                                }
                            })( this )}
                        </li>
                        <li className={type == "full" ? "tabs__item active" : "tabs__item"}>
                            {(function( scope ){
                                if ( id === 0 ) {
                                    return <a className="tabs__link" href="#full" data-toggle="tab" role="tab" aria-controls="full" aria-expanded="true">Подробно</a>
                                } else {
                                    return <a className="tabs__link" href={"/" + id + "/full"}>Подробно</a>                                    
                                }
                            })( this )}
                        </li>
                        <li className={type == "visual" ? "tabs__item active" : "tabs__item"}>
                            {(function( scope ){
                                if ( id === 0 ) {
                                    return <a className="tabs__link" href="#visual" data-toggle="tab" role="tab" aria-controls="visual" aria-expanded="true">Наглядно</a>
                                } else {
                                    return <a className="tabs__link" href={"/" + id + "/visual"}>Наглядно</a>                                    
                                }
                            })( this )}
                        </li>
                    </ul>
                </div>                
            );
        }
    });

module.exports = Tabs;
