var RowContainerView = Backbone.View.extend({
    el: '#row-container',

    initialize: function() {
        this.listenTo(this.collection, 'reset', this.render);
    },

    render: function() {
        var payload = [];

        this.collection.each(function(model) {
          var view = new RowView({model: model});
          payload.push(view.render().el);
        });

        this.$el.html(payload);
    }
});

var RowView = Backbone.View.extend({
    tagName: 'div',
    className: 'cell w-12 row',

    template: _.template($('#row-template').html()),

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});
