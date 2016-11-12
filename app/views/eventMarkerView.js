app.views.eventMarkerView = Backbone.View.extend({
		initialize: function(options) {
			this.map = options.map;

			// create the markers
			var icon = "";
      switch (this.model.attributes.address_status) {
          case "Requested":
              icon = "blue";
              break;
          case "Contaminated":
              icon = "red";
              break;
          case "Unsubmitted":
              icon = "yellow";
              break;
          case "Uncontaminated":
              icon = "green";
              break;
      }
			var icon_path = "../assets/img/marker-" + icon + ".png";
			this.marker = new google.maps.Marker({
		        map: this.map,
		        position: new google.maps.LatLng(this.model.attributes.latitude, this.model.attributes.longitude),
		        address: this.model.attributes.street_address,
		        id : this.model.attributes.id,
						icon : icon_path,
						address_status: this.model.attributes.address_status,
						city: this.model.attributes.city,
						state: this.model.attributes.state,
						zip: this.model.attributes.zip,
						decade_built: this.model.attributes.decade_built,
						test_1_date: this.formatDate(this.model.attributes.test_1_date),
						test_1_status: this.model.attributes.test_1_status,
						test_1_results: this.model.attributes.test_1_results,
						test_1_action_needed: this.model.attributes.test_1_action_needed,
						test_2_date: this.formatDate(this.model.attributes.test_2_date),
						test_2_status: this.model.attributes.test_2_status,
						test_2_results: this.model.attributes.test_2_results,
						test_2_action_needed: this.model.attributes.test_2_action_needed
		    });

			// hook the infoWindow description
			this.marker.infoWindow = options.infoWindow;

			// wire the marker events
	  	google.maps.event.addListener(this.marker, 'click', this.showEventDetails);
		},

		render: function() { },

    showEventDetails: function() {
    	var infoContent = '<div id="content">' +
			'<h3>' + this.address_status + '</h3>' +
			'<div><strong>' + this.address + '</strong><br/>' + this.city + ', ' + this.state + '' + this.zip + '</div>' +
			'<div>Decade Built: ' + this.decade_built + '</div>' +
			'<h4 style="margin-top: 10px;">Test 1</h4>' +
			'<div>Date: ' + this.test_1_date + '</div>' +
			'<div>Status: ' + this.test_1_status + '</div>' +
			'<div>Results: ' + this.test_1_results + '</div>' +
			'<div>Action Needed?:' + this.test_1_action_needed + '</div>' +
			'<h4 style="margin-top: 10px;">Test 2</h4>' +
			'<div>Date: ' + this.test_2_date + '</div>' +
			'<div>Status: ' + this.test_2_status + '</div>' +
			'<div>Results: ' + this.test_2_results + '</div>' +
			'<div>Action Needed?:' + this.test_2_action_needed + '</div>';

			//'<div>Start Date: ' + this.startDate + '</div>' +
			//'<div>Category: ' + this.category + '</div>';

			infoContent += '</div>';

			this.infoWindow.setContent(infoContent);

			this.infoWindow.open(this.map, this);
    },

    formatDate: function(dateString) {
    	var formattedDate = new Date(dateString);
    	return formattedDate.toDateString();
    }
});
