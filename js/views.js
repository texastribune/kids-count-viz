var RowContainerView = Backbone.View.extend({
  el: '#row-container',

  initialize: function() {
    this.listenTo(this.collection, 'ready', this.render);
    this.listenTo(this.collection, 'sort', this.render);
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
    });

    $('.chart-cell').addClass('hidden');
  },

  loadChart: function() {
    this.emptyAllCharts();

    this.$('.chart-cell').removeClass('hidden');

    new ChartView({
      model: this.model,
      texas: texas,
      el: this.$('.chart-container')
    });
  }
});

var ChartView = Backbone.View.extend({
  labels: _.range(2000, 2012),

  initialize: function(obj) {
    this.texas = obj.texas;
    this.renderChart();
  },

  renderChart: function() {
    var parentWidth = this.$el.parent().width();
    this.$el.attr({width: parentWidth, height: 200});

    this.chart = new Chart(this.el.getContext('2d'));

    var max = _.max(_.union(
      this.model.get('pct_poverty_child'),
      this.texas.get('pct_poverty_child'),
      this.model.get('pct_unemployment'),
      this.texas.get('pct_unemployment')
    ));

    this.chart.Line({
      labels: this.labels,
      datasets: [{
        fillColor: "rgba(177, 33, 37, 0.5)",
        strokeColor: "rgb(177, 33, 37)",
        pointColor: "rgb(177, 33, 37)",
        pointStrokeColor : "#fff",
        data: this.model.get('pct_poverty_child')
      },{
        fillColor: "rgba(220, 139, 106, 0.5)",
        strokeColor: "rgb(220, 139, 106)",
        pointColor: "rgb(220, 139, 106)",
        pointStrokeColor : "#fff",
        data: this.texas.get('pct_poverty_child')
      },{
        fillColor: "rgba(62, 103, 176, 0.5)",
        strokeColor: "rgb(62, 103, 176)",
        pointColor: "rgb(62, 103, 176)",
        pointStrokeColor : "#fff",
        data: this.model.get('pct_unemployment')
      },{
        fillColor: "rgba(68, 171, 223, 0.5)",
        strokeColor: "rgb(68, 171, 223)",
        pointColor: "rgb(68, 171, 223)",
        pointStrokeColor : "#fff",
        data: this.texas.get('pct_unemployment')
      }]
    }, {
      scaleFontFamily: "'Helvetica', 'Arial', sans-serif",
      scaleLabel : "<%= (value * 100) %>%",
      datasetFill: false,
      scaleOverride: true,
      scaleStartValue: 0,
      scaleSteps: Math.ceil(max/0.05),
      scaleStepWidth: 0.05
    });
  }
});

var SortSelectView = Backbone.View.extend({
  el: '#sort-select',

  events: {
    'change': 'alterSort'
  },

  alterSort: function() {
    var val = this.$el.val();
    console.log(val);
    this.collection.comparator = function(model) {
      return -model.get(val);
    };

    this.collection.sort();
  }

});
