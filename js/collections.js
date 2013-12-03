var CountyCollection = Backbone.Collection.extend({
  model: CountyModel,

  comparator: function(model) {
    return model.get("county");
  }
});
