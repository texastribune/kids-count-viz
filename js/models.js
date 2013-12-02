var CountyModel = Backbone.Model.extend({
    initialize: function() {
        this.calculatePovertyChange();
    },

    calculatePovertyChange: function() {
        var old = this.get("pct_poverty_child")[0];
        var new_data = this.get("pct_poverty_child")[11];
        var diff = Math.round(((new_data - old)/old) * 1000) / 10;

        this.set("poverty_change", diff);
    }
});
