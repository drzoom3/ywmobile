var Search = React.createClass({    
    render: function () {
        var city = this.props.city;
        
        return (
            <div className="search">
                <form id="search-city-form">
                    <div className="search__input-wrap">
                        <input className="search__input" placeholder={city} id="search-city-input" autoComplete="off" autoCorrect="off"  autoCapitalize="off"/>
                        <div className="search__clear hide" id="search-city-clear"></div>
                    </div>
                    <button type="submit" className="search__submit" id="search-city-btn">Найти</button>
                </form>
                <div className="suggest" id="suggest"></div>
            </div>
        );
    }
});

module.exports = Search;
