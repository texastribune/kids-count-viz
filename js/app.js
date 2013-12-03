// bootstrappin'

var counties = new CountyCollection();
counties.reset(kids_count_data);
var texas = counties.remove(counties.findWhere({county: 'Texas'}));

new RowContainerView({collection: counties});
countySelectorView = new CountySelectView();

counties.trigger('ready');
