var Header = React.createClass({
        render: function () {
            return (
                <header className="header">
                    <a className="header__logo" href="//www.yandex.ru" target="_blank">
                        <img src="http://yastatic.net/www/2.131/yaru/i/logo.png" alt="Яндекс" width="67" height="27"/>
                    </a>
                    <a href="//weather.yandex.ru/" className="header__category" target="_blank">Погода</a>
                </header>                
            );
        }
    });

module.exports = Header;
