// bootstrappin'

var counties = new CountyCollection();
counties.reset(kids_count_data, {parse: true});

_.each(counties.models, function(m, i) {
  var countySelect = new CountySelectView({model: m, collection: this.collection});
});

var texas = counties.remove(counties.findWhere({county: 'Texas'}));

new RowContainerView({collection: counties});

sortSelect = new SortSelectView({collection: counties});
sortSelect.alterSort('poverty_2011');

counties.trigger('ready');
