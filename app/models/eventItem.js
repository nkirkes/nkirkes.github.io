app.models.eventItem = Backbone.Model.extend({
	defaults: function() {
		return {
			id: null,
			street_address: '',
			city: '',
			state: '',
			zip: '',
			decade_built: '',
			test_1_date: null,
			test_1_status: '',
			test_1_results: '',
			test_1_action_needed: false,
			test_2_date: null,
			test_2_status: '',
			test_2_results: '',
			test_2_action_needed: false,
			latitude: null,
			longitude: null
		};
	}
});
