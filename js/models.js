var CountyModel = Backbone.Model.extend({
    calculatePovertyChange: function() {
        var old = this.get("poverty_raw_children")["Number-2011"];
        var new_data = this.get("poverty_raw_children")["Number-2000"];
        var diff = Math.round(((new_data - old)/old) * 1000) / 10;
        var diff_text = '';

        diff > 0 ? diff_text = 'increased ' + diff : diff_text = 'decreased ' + diff;
        return diff_text;
    },

    calculateDiffFromTexas: function(texas) {
        var diff = texas.get("poverty_raw_children")["Percent-2011"];
    },

    getLatestChildPovertyRate: function() {
        return Math.round(this.get("poverty_raw_children")["Percent-2011"] * 1000) / 10;
    },

    getLatestUnemploymentRate: function() {
        return Math.round(this.get("unemployment_raw")["Percent-2011"] * 1000) / 10;
    }
});
