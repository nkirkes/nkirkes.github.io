app.views.eventListView = Backbone.View.extend({
	markers: [],
	infoWindow: null,
	el: '#filters',
	events: {
        'click [type="checkbox"]' : 'getFilteredEvents'
    },
	initialize: function(options) {
		this.map = options.map;
		this.initMap();
	},

	getFilteredEvents: function(){
		var filterOptions = document.getElementsByName('category');

		var filters = [];
		for (var i = 0; i < filterOptions.length; i++) {
			if (filterOptions[i].checked) {
				filters.push(filterOptions[i].value);
			}
		}
		this.clearMarkers();
		this.model.setFilters(filters);
		this.model.setRadius(this.getRadius(this.map));
		this.fetchEvents();
	},

	fetchEvents: function() {
		var self = this;
		this.model.fetch({
			success: function (collection, response) {
				self.render();
			},
			error: function (collection, response) {
				console.dir(response);
			}
		});
	},

	initMap: function() {
		var self = this;

    // start in Indianapolis
    var center = new google.maps.LatLng(this.model.latitude, this.model.longitude);
    var mapOptions = {
        center: center,
        zoom: 11,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // global info window
    this.infoWindow = new google.maps.InfoWindow();

		google.maps.event.addListener(this.map, 'dragend', function() {
			self.clearMarkers();
      self.dragMap(this.center, map, self);
    });

    google.maps.event.addListenerOnce(this.map, 'bounds_changed', function() {
    	// get an initial set of data
		self.getFilteredEvents();
    });
  },

	addEventMarker : function(eventItem){
        var markerView = new app.views.eventMarkerView({ model: eventItem, map: this.map, infoWindow: this.infoWindow });
        this.markers.push(markerView);
    },

	render: function() {
		this.model.each(this.addEventMarker, this);
	},

	dragMap: function(latLng, map, t) {
		// set new latlong
		this.model.configure({ latitude: latLng.lat(), longitude: latLng.lng() });

		// refetch
		this.getFilteredEvents();
	},

	// this is ugly. Has to be a better way to get to the marker...
	clearMarkers: function() {
		this.markers.forEach(function(marker) { marker.marker.setMap(null); });
	},

	getRadius: function(map) {
		// Thanks StackOverflow! http://stackoverflow.com/questions/3525670/radius-of-viewable-region-in-google-maps-v3
		var bounds = map.getBounds();
		var center = bounds.getCenter();
		var ne = bounds.getNorthEast();

		// r = radius of the earth in statute miles
		var r = 3963.0;

		// Convert lat or lng from decimal degrees into radians (divide by 57.2958)
		var lat1 = center.lat() / 57.2958;
		var lon1 = center.lng() / 57.2958;
		var lat2 = ne.lat() / 57.2958;
		var lon2 = ne.lng() / 57.2958;

		// distance = circle radius from center to Northeast corner of bounds
		var dis = r * Math.acos(Math.sin(lat1) * Math.sin(lat2) +
		Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1));
		return dis*500;
	}
});
