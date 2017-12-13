/* CREDIT: http://www.movable-type.co.uk/scripts/latlong.html */

(function() {

    angular
        .module('airplaneApp')
        .factory('DistanceCalcs', distanceCalcs);

    //selectedData.$inject = ['$http'];
    function distanceCalcs() {

        var toRadians = function(degrees) {
            return degrees * Math.PI / 180;
        };

        var toDegrees = function(radians) {
            return radians * 180 / Math.PI;
        };

        var calculateDistance = function(lat1, lon1, lat2, lon2) {

            var radius = 6371e3;

            var φ1 = toRadians(lat1);
            var λ1 = toRadians(lon1);
            var φ2 = toRadians(lat2);
            var λ2 = toRadians(lon2);

            var R = radius;
            //var φ1 = this.lat.toRadians(),  λ1 = this.lon.toRadians();
            //var φ2 = point.lat.toRadians(), λ2 = point.lon.toRadians();
            var Δφ = φ2 - φ1;
            var Δλ = λ2 - λ1;

            var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c;

            return d;

        };

        var calculateBearing = function(lat1, lon1, lat2, lon2) {
            //if (!(point instanceof LatLon)) throw new TypeError('point is not LatLon object');

            var φ1 = toRadians(lat1),
                φ2 = toRadians(lat2);
            var Δλ = toRadians(lon2) - toRadians(lon1);

            // see http://mathforum.org/library/drmath/view/55417.html
            var y = Math.sin(Δλ) * Math.cos(φ2);
            var x = Math.cos(φ1) * Math.sin(φ2) -
                Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
            var θ = Math.atan2(y, x);
            θ = toDegrees(θ);

            return (θ + 360) % 360;
        };

        var bearingCompassPoint = new function(bearing, precision) {
            if (precision === undefined) precision = 3;
            // note precision = max length of compass point; it could be extended to 4 for quarter-winds
            // (eg NEbN), but I think they are little used

            bearing = ((bearing % 360) + 360) % 360; // normalise to 0..360

            var point;

            switch (precision) {
                case 1: // 4 compass points
                    switch (Math.round(bearing * 4 / 360) % 4) {
                        case 0:
                            point = 'N';
                            break;
                        case 1:
                            point = 'E';
                            break;
                        case 2:
                            point = 'S';
                            break;
                        case 3:
                            point = 'W';
                            break;
                    }
                    break;
                case 2: // 8 compass points
                    switch (Math.round(bearing * 8 / 360) % 8) {
                        case 0:
                            point = 'N';
                            break;
                        case 1:
                            point = 'NE';
                            break;
                        case 2:
                            point = 'E';
                            break;
                        case 3:
                            point = 'SE';
                            break;
                        case 4:
                            point = 'S';
                            break;
                        case 5:
                            point = 'SW';
                            break;
                        case 6:
                            point = 'W';
                            break;
                        case 7:
                            point = 'NW';
                            break;
                    }
                    break;
                case 3: // 16 compass points
                    switch (Math.round(bearing * 16 / 360) % 16) {
                        case 0:
                            point = 'N';
                            break;
                        case 1:
                            point = 'NNE';
                            break;
                        case 2:
                            point = 'NE';
                            break;
                        case 3:
                            point = 'ENE';
                            break;
                        case 4:
                            point = 'E';
                            break;
                        case 5:
                            point = 'ESE';
                            break;
                        case 6:
                            point = 'SE';
                            break;
                        case 7:
                            point = 'SSE';
                            break;
                        case 8:
                            point = 'S';
                            break;
                        case 9:
                            point = 'SSW';
                            break;
                        case 10:
                            point = 'SW';
                            break;
                        case 11:
                            point = 'WSW';
                            break;
                        case 12:
                            point = 'W';
                            break;
                        case 13:
                            point = 'WNW';
                            break;
                        case 14:
                            point = 'NW';
                            break;
                        case 15:
                            point = 'NNW';
                            break;
                    }
                    break;
                default:
                    throw new RangeError('Precision must be between 1 and 3');
            }

            return point;
        }

        return {
            toRadians: toRadians,
            toDegrees: toDegrees,
            calculateDistance: calculateDistance,
            calculateBearing: calculateBearing,
            bearingCompassPoint : bearingCompassPoint
        };
    }

})();
