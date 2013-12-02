var RowContainerView = Backbone.View.extend({
    el: '#row-container'
});

var RowView = Backbone.View.extend({
    tagName: 'div',
    className: 'cell w-12',

    template: _.template($('#row-template').html())
});
