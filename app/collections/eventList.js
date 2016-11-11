app.collections.eventList = Backbone.Collection.extend({

	model: app.models.eventItem,
	filters: [],
	mapRadius: 10000, // default to 2km
	// initial values set to Indianapolis
  latitude: "39.768403",
	longitude: "-86.158068",

  initialize: function(){

  },

  setFilters: function(criteria){
  	this.filters = criteria;
  },

  setRadius: function(radius) {
  	if (radius > 0) {
  		mapRadius = radius;
  	}
  },

  url: function() {
		return "../../assets/data/dataset.json";
		//return "https://www.dropbox.com/s/bbvzukzdkyxquzn/dataset.json";
  },

  configure: function(options) {
		this.latitude = options.latitude;
		this.longitude = options.longitude;
	},

	parse: function(response) {
		return response;
 		/*if (response.status === "OK") {
			var events = new Array();
			var self = this;
			_.each(response.results, function(element, index, list) {
				events.push(new app.models.eventItem( {
					"id": element.test_id,
					"street_address": element.street_address,
					"city": element.city,
					"state": element.state,
					"zip": element.zip,
					"decade_built": element.decade_built,
					"test_1_date": element.test_1_date,
					"test_1_status": element.test_1_status,
					"test_1_results": element.test_1_results,
					"test_1_action_needed": element.test_1_action_needed,
					"test_2_date": element.test_2_date,
					"test_2_status": element.test_2_status,
					"test_2_results": element.test_2_status,
					"test_2_action_needed": element.test_2_action_needed,
					"latitude": element.geocode_latitude,
					"longitude": element.geocode_longitude
				}));
			});
			return events;
		//} else {
		//	console.dir(response);
		//	return [];
	//	}*/
	}
});
