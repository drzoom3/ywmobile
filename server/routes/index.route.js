var colors = require('../helpers/colors.helper.js'),
    forecast = require('../helpers/forecast.helper.js'),
    daytime = require('../helpers/daytime.ru.helper.js'),
    extend = require('node.extend'),
    moment = moment = require('moment');

module.exports = function (req, res) {
    var geoid = req.params.id;
    res.setHeader('Cache-Control', 'public, max-age=3600000');
    
    forecast(geoid).then(function (result) {
        //Short view        
        var daysShort = [],
            daysFull = [],
            daysVisual = [],
            min = 0,
            max = 0,
            nowDate = moment(Date.now());
        
        result.forecast.map(function (object, i) {
            var partsShort = [],
                partsFull = [],
                partVisual,
                dayDate = moment(object.date);
            
            object.parts.map(function (part, j) {
                    if (
                        (part.type === "morning" && (( nowDate.date() !== dayDate.date()) || (nowDate.date() === dayDate.date() && nowDate.hour() < 12))) || 
                        (part.type === "day" && ((nowDate.date() !== dayDate.date()) || (nowDate.date() === dayDate.date() && nowDate.hour() < 18))) || 
                        (part.type === "evening" && ((nowDate.date() !== dayDate.date()) || (nowDate.date() === dayDate.date() && nowDate.hour() < 23))) || 
                        (part.type === "night")) {
                            
                        if (i < 4) {
                            partsShort[partsShort.length] = {
                                type: daytime[part.type],
                                weather_icon: part.weather_icon,
                                temp: part.temp,
                                color: colors[part.temp],
                                temp_max: part.temp_max,
                                temp_min: part.temp_min
                            };
                        }

                        if (i < 2) {
                            partsFull[partsFull.length] = {
                                type: daytime[part.type],
                                weather: part.weather,
                                weather_icon: part.weather_icon,
                                temp: part.temp,
                                color: colors[part.temp],
                                temp_max: part.temp_max,
                                temp_min: part.temp_min,
                                wind: part.wind,
                                wind_speed: part.wind_speed,
                                wind_direction: part.wind_direction,
                                humidity: part.humidity,
                                pressure: part.pressure
                            };
                        }
                    }
                
                if (part.type === "day_short") {
                    min = part.temp < min ? part.temp : min;
                    max = part.temp > max ? part.temp : max;
                    partVisual = {
                        weather_icon: part.weather_icon,
                        weather: part.weather,
                        temp: part.temp,
                        color: colors[part.temp]
                    };
                }
            })

            if (i < 4) {
                daysShort[daysShort.length] = {
                    date: object.date,
                    parts: partsShort
                };
            }

            if(i < 2) {
                daysFull[daysFull.length] = {
                    date: object.date,
                    parts: partsFull
                };
            }            
            
            daysVisual[daysVisual.length] = extend({
                date: object.date
            }, partVisual);
        });
        
        var nowShort = {
            temp: result.fact.temp,
            color: colors[result.fact.temp],
            weather: result.fact.weather,
            weather_icon: result.fact.weather_icon,
            wind_speed: result.fact.wind_speed,
            humidity: result.fact.humidity,
            pressure: result.fact.pressure
        }
        var nowFull = {
            temp: result.fact.temp,
            color: colors[result.fact.temp],
            weather: result.fact.weather,
            weather_icon: result.fact.weather_icon,
            wind: result.fact.wind,
            wind_direction: result.fact.wind_direction,
            wind_speed: result.fact.wind_speed,
            humidity: result.fact.humidity,
            pressure: result.fact.pressure,
            sunrise: result.forecast[0].sunrise,
            sunset: result.forecast[0].sunset
        }
        var nowVisual = {
            temp: result.fact.temp,
            weather: result.fact.weather,
            weather_icon: result.fact.weather_icon
        }
                
        var data = {
            info: result.info,
            short: {
                now: nowShort,
                forecast: daysShort
            },
            full: {
                now: nowFull,
                forecast: daysFull
            },
            visual: {
                now: nowVisual,
                forecast: daysVisual,
                min: min,
                max: max
            }
        };
        
        data.info.id = geoid;
        
        var type = req.params.type;
        if (type) {
            data.type = type;
            
            res.render(__dirname + '/../../static/pages/index/viewtype', data);
        } else {
            res.render(__dirname + '/../../static/pages/index/index', data);
        }
        res.end();
    });
};
