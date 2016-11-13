app.views.eventMarkerView = Backbone.View.extend({
		initialize: function(options) {
			this.map = options.map;

			// create the markers
			var icon = "";
      switch (this.model.attributes.address_status) {
          case "Testing":
              icon = "blue";
              break;
          case "Exceeds Limit":
              icon = "red";
              break;
          case "At Lab":
              icon = "yellow";
              break;
          case "Complete":
              icon = "green";
              break;
      }
			var icon_path = "../assets/img/marker-" + icon + ".png";
			this.marker = new google.maps.Marker({
		        map: this.map,
		        position: new google.maps.LatLng(this.model.attributes.latitude, this.model.attributes.longitude),
						id : this.model.attributes.id,
						icon : icon_path,
						customer_name: this.model.attributes.customer_name,
						address: this.model.attributes.street_address,
		        city: this.model.attributes.city,
						state: this.model.attributes.state,
						zip: this.model.attributes.zip,
						phone: this.model.attributes.phone,
						test_type: this.model.attributes.test_type,
						test_category: this.model.attributes.test_category,
						test_status: this.model.attributes.test_status,
						analysis: this.model.attributes.analysis,
						results_delivered_date: this.formatDate(this.model.attributes.results_delivered_date),
						address_status: this.model.attributes.address_status		    });

			// hook the infoWindow description
			this.marker.infoWindow = options.infoWindow;

			// wire the marker events
	  	google.maps.event.addListener(this.marker, 'click', this.showEventDetails);
		},

		render: function() { },

    showEventDetails: function() {
    	var infoContent = '<div id="content">' +
			'<h3>' + this.customer_name + '</h3>' +
			'<div><strong>' + this.address + '</strong><br/>' + this.city + ', ' + this.state + ' ' + this.zip + '</div>' +
			'<div>Phone:: ' + this.phone + '</div>' +
			'<div>Test Type: ' + this.test_type+ '</div>' +
			'<div>Test Category: ' + this.test_category + '</div>' +
			'<div>Analysis: ' + this.analysis + ' ppb</div>' +
			'<div>Results delivered to customer: ' + this.results_delivered_date + '</div>';

			infoContent += '</div>';

			this.infoWindow.setContent(infoContent);

			this.infoWindow.open(this.map, this);
    },

    formatDate: function(dateString) {
    	var formattedDate = new Date(dateString);
    	return formattedDate.toDateString();
    }
});
