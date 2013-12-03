var CountyModel = Backbone.Model.extend({
    parse: function(payload) {
      payload['poverty_2011'] = _.last(payload['pct_poverty_child']);
      payload['unemploy_2011'] = _.last(payload['pct_unemployment']);

      return payload;
    },

    calculatePovertyChange: function() {
        var old = this.get("poverty_raw_children")["Number-2000"];
        var new_data = this.get("poverty_raw_children")["Number-2011"];
        var diff = Math.round(((new_data - old)/old) * 1000) / 10;
        var diff_text = '';

        diff > 0 ? diff_text = 'increased ' + diff : diff_text = 'decreased ' + Math.abs(diff);
        return diff_text;
    },

    calculateChildPopChange: function() {
        var old = this.get("child_pop")["Number-2000"];
        var new_data = this.get("child_pop")["Number-2011"];


        var diff = Math.round(((new_data - old) / old) * 1000) / 10;
        var diff_text = '';

        diff > 0 ? diff_text = 'increased ' + diff : diff_text = 'decreased ' + Math.abs(diff);
        return diff_text;
    },

    calculateDiffFromTexas: function() {
        var county = this.get("poverty_raw_children")["Percent-2011"];
        var tx = texas.get("poverty_raw_children")["Percent-2011"]
        var diff = Math.round((county - tx) * 1000) / 10;
        var diff_text = '';

        diff > 0 ? diff_text = diff + ' percentage points higher than ' : diff_text = Math.abs(diff) + ' percentage points lower than ';
        return diff_text;
    },

    getLatestChildPovertyRate: function() {
        return Math.round(this.get("poverty_raw_children")["Percent-2011"] * 1000) / 10;
    },

    getLatestUnemploymentRate: function() {
        return Math.round(this.get("unemployment_raw")["Percent-2011"] * 1000) / 10;
    }
});
