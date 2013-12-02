var CountyModel = Backbone.Model.extend({
    calculatePovertyChange: function() {
        var old = this.get("pct_poverty_child")[0];
        var new_data = this.get("pct_poverty_child")[11];
        var diff = Math.round(((new_data - old)/old) * 1000) / 10;

        return diff;
    },

    getLatestChildPovertyRate: function() {
        return Math.round(this.get("poverty_raw_children")["Percent-2011"] * 1000) / 10;
    },

    getLatestUnemploymentRate: function() {
        return Math.round(this.get("unemployment_raw")["Percent-2011"] * 1000) / 10;
    }
});
