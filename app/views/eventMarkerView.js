app.views.eventMarkerView = Backbone.View.extend({
		initialize: function(options) {
			this.map = options.map;
			this.marker = new google.maps.Marker({
		        map: this.map,
		        position: new google.maps.LatLng(this.model.attributes.latitude, this.model.attributes.longitude),
		        title: this.model.attributes.street_address,

		        id : this.model.attributes.id
		        //startDate: this.formatDate(this.model.attributes.startDate),
		        //category: this.model.attributes.category,
		        //subcategory: this.model.attributes.subcategory
		    });

			// hook the infoWindow description
			this.marker.infoWindow = options.infoWindow;

			// wire the marker events
	  	google.maps.event.addListener(this.marker, 'click', this.showEventDetails);
		},

		render: function() { },

    showEventDetails: function() {
    	var infoContent = '<div id="content">' +
			'<h1>' + this.title + '</h1>' +
			'<div>' + this.descr + '</div>' +
			'<div>Start Date: ' + this.startDate + '</div>' +
			'<div>Category: ' + this.category + '</div>';

		if (this.subcategory !== null) {
			infoContent += '<div>Subcategory: ' + this.subcategory + '</div>';
		}

		infoContent += '</div>';

		this.infoWindow.setContent(infoContent);

		this.infoWindow.open(this.map, this);
    },

    formatDate: function(dateString) {
    	var formattedDate = new Date(dateString);
    	return formattedDate.toDateString();
    }
});
