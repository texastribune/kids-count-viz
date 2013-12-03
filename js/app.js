// bootstrappin'

var counties = new CountyCollection();
counties.reset(kids_count_data, {parse: true});
var texas = counties.remove(counties.findWhere({county: 'Texas'}));

new RowContainerView({collection: counties});
new SortSelectView({collection: counties});
var countySelectorView = new CountySelectView();

counties.trigger('ready');
