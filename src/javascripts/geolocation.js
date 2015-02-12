;(function ( $ ) {
    $.fn.GeoLocation = function( options ) {

        var settings = $.extend({

            // destination: { latitude: 53.339381, longitude: -6.260533 }

        }, options );

        return this.each(function() {

            var element = $(this);
                element.html('<div class="grid"></div><div class="preloader"><span>Finding Your Location</span></div>');

            function displayCurrentPosition( data ) {

                var currentPosition = new google.maps.LatLng( data.coords.latitude, data.coords.longitude );
                // var destination = new google.maps.LatLng( data.destination.latitude, data.destination.longitude );

                var mapOptions = {
                    center: currentPosition,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    zoom: 10,
                    panControl: true,
                    zoomControl: true,
                    zoomControlOptions: {
                      style: google.maps.ZoomControlStyle.DEFAULT
                    },
                    mapTypeControl: true,
                    mapTypeControlOptions: {
                      style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR
                    },
                    scaleControl: true,
                    streetViewControl: false,
                    overviewMapControl: true,
                    // Map styles from Snazzy Maps - http://snazzymaps.com/style/1/pale-dawn
                    styles: [{'featureType':'water','stylers':[{'visibility':'on'},{'color':'#acbcc9'}]},{'featureType':'landscape','stylers':[{'color':'#f2e5d4'}]},{'featureType':'road.highway','elementType':'geometry','stylers':[{'color':'#c5c6c6'}]},{'featureType':'road.arterial','elementType':'geometry','stylers':[{'color':'#e4d7c6'}]},{'featureType':'road.local','elementType':'geometry','stylers':[{'color':'#fbfaf7'}]},{'featureType':'poi.park','elementType':'geometry','stylers':[{'color':'#c5dac6'}]},{'featureType':'administrative','stylers':[{'visibility':'on'},{'lightness':33}]},{'featureType':'road'},{'featureType':'poi.park','elementType':'labels','stylers':[{'visibility':'on'},{'lightness':20}]},{},{'featureType':'road','stylers':[{'lightness':20}]}]
                };

                var map = new google.maps.Map( element[0], mapOptions );

                var markerIcon = { url: 'src/images/crosshairs.png' };

                var mapMarker = new google.maps.Marker({
                    position: currentPosition,
                    map: map,
                    icon: markerIcon
                });


                // // Working on adding directions at the moment
                // // ==========================================
                // var directions = {
                //     origin: currentPosition,
                //     destination: destination,
                //     travelMode: google.maps.DirectionsTravelMode.DRIVING
                // };
                //
                // display = new google.maps.DirectionsRenderer({ map: map });
                //
                // service = new google.maps.DirectionsService();
                // service.route(directions, function(response, status) {
                //     if (status == google.maps.DirectionsStatus.OK) {
                //         display.setDirections(response);
                //     } else {
                //         alert ('failed to get directions');
                //     }
                // });

                // Handling the re-centering of the pin on window resize
                // =====================================================
                google.maps.event.addDomListener(window, 'resize', function() {
                    var center = map.getCenter();
                    google.maps.event.trigger(map, 'resize');
                    map.setCenter(center);
                });

            } // END displayCurrentPosition()

            // Errors that will display when HTML5 geolocation throws an error
            // ===============================================================
            function onError( error ) {
                switch( error.code ) {
                    case error.PERMISSION_DENIED:
                        element.text('Access to location API denied by user');
                        break;
                    case error.POSITION_UNAVAILABLE:
                        element.text('Unable to determine location');
                        break;
                    case error.TIMEOUT:
                        element.text('Unable to determine location, the request timed out');
                        break;
                    case error.UNKNOWN_ERROR:
                        element.text('An unknown error occurred!');
                        break;
                }
            } // END onError()

            // Checking if Browser supports HMTL5 Geolocation if so run our code above
            // =======================================================================
            if ( navigator.geolocation ) {
                navigator.geolocation.getCurrentPosition( displayCurrentPosition , onError);
            } else {
                element.text('Geolocation is not supported by this browser, please upgrade to a more recent version');
            }

        });
    };
}( jQuery ));
