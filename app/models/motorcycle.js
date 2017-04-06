import DS from 'ember-data';

export default DS.Model.extend({
	LIC: DS.attr('string'),
	VIN: DS.attr('string'),
	availabledates: DS.attr(),
	description: DS.attr(),
	price: DS.attr(),
	category: DS.attr('string'),
	color: DS.attr('string'),
	isCompleted: DS.attr('boolean'),
	lat: DS.attr(),
	long: DS.attr(),
	make: DS.attr('string'),
	media: DS.attr(),
	mileage: DS.attr('number'),
	model: DS.attr('string'),
	year: DS.attr('number'),
	uid: DS.attr('number')
});
