(function() {
    
    if (document.getElementById('update-timer-full')) {
        React.render(<UpdateTimer text="Обновлено только что" />, document.getElementById('update-timer-full'));
    }
    if (document.getElementById('update-timer-visual')) {
        React.render(<UpdateTimer text="Обновлено только что" />, document.getElementById('update-timer-visual'));
    }
    React.render(<Suggest />, document.getElementById('suggest'));
})();


(function() {    
    var weather = JSON.parse(StorageAPI.getItem('yaWeather')||'{}'),
        id = location.href.split("/")[3];
    
    if (weather) {
        if (!weather.cities) { weather.cities = []; }
        var inArray = false;
        weather.cities.map(function(object) {
            object.last = false;
            if (object.id === id) {object.last = true; inArray = true;}
        });
        if (!inArray) {
            weather.cities.push({id: id, last: true});
        }

        StorageAPI.setItem('yaWeather',JSON.stringify(weather));
    }
})();