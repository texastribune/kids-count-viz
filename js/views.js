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

  events: {
    'click .load-chart': 'loadChart'
  },

  template: _.template($('#row-template').html()),

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },

  emptyAllCharts: function() {
    $('.chart-container').each(function(i,v) {
      var ctx = v.getContext('2d');
      ctx.clearRect(0, 0, v.width, v.height);
    }).addClass('hidden');
  },

  loadChart: function() {
    this.emptyAllCharts();

    new ChartView({
      model: this.model,
      el: this.$('.chart-container').removeClass('hidden')
    });
  }
});

var ChartView = Backbone.View.extend({
  labels: _.range(2000, 2012),

  initialize: function() {
    this.renderChart();
  },

  renderChart: function() {
    console.log(this.el);
    var parentWidth = this.$el.parent().width();
    this.$el.attr({width: parentWidth, height: 300});

    this.chart = new Chart(this.el.getContext('2d'));

    this.chart.Line({
      labels: this.labels,
      datasets: [{
        fillColor: "rgba(177, 33, 37, 0.5)",
        strokeColor: "rgb(177, 33, 37)",
        pointColor: "rgb(177, 33, 37)",
        pointStrokeColor : "#fff",
        data: this.model.get('pct_poverty_child')
      }]
    });
  }
});
