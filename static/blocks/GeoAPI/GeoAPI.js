var GeoAPI = (function ($, StorageAPI) {
    var MOSCOW_ID = 213;
    return {
        getGeoId: function() {
            var promise = $.Deferred(),
                weather = JSON.parse(StorageAPI.getItem('yaWeather')||'{}');
            if (weather && weather.cities) {
                var city = weather.cities.filter(function(object) {
                    return true === object.last;
                })[0];
                promise.resolve(city.id);
                
            } else {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        if (position && position.coords) {
                            $.get( '/location', { latitude: position.coords.latitude, longitude: position.coords.longitude}).done(function( data ) {
                                if (weather) {
                                    if (!weather.cities) { weather.cities = []; }
                                    var inArray = false;
                                    weather.cities.map(function(object) {
                                        object.last = false;
                                        if (object.id === data.geoid) {object.last = true; inArray = true;}
                                    });
                                    if (!inArray) {
                                        weather.cities.push({id: data.geoid, last: true});
                                    }
                                    
                                    StorageAPI.setItem('yaWeather',JSON.stringify(weather));
                                }
                                
                                promise.resolve(data.geoid);
                            }).fail(function() {
                                promise.resolve(MOSCOW_ID);
                            });
                        } else {
                            promise.resolve(MOSCOW_ID);
                        }

                    }, function() {
                        promise.resolve(MOSCOW_ID);
                    });

                } else {
                    promise.resolve(MOSCOW_ID);
                }
            }
            
            return promise.promise();
        }
    };
})(jQuery, StorageAPI);

