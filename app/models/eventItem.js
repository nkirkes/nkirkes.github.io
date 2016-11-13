app.models.eventItem = Backbone.Model.extend({
	defaults: function() {
		return {
			id: null,
			street_address: '',
			city: '',
			state: '',
			zip: '',
			phone: '',
			test_type: '',
			test_category: '',
			test_status: '',
			analysis: '',
			results_delivered_date: null,
			address_status: '',
			latitude: null,
			longitude: null
		};
	}
});
