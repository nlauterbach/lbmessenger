Module.register("lbmessenger",{
	// Default module config.
	defaults: {
    refreshPeriod: 30000,
    messageURL: 'http://lbmessenger.azurewebsites.net/messages/'
	},
  //start
  start: function() {
    var self = this;
    self.updateDom();
    setInterval(function() {
      self.updateDom(); // no speed defined, so it updates instantly.
    }, this.config.refreshPeriod); //perform every 1000 milliseconds.
  },
  messagePull: function(callback) {
		var xobj = new XMLHttpRequest(), path = this.config.messageURL;
		xobj.overrideMimeType("application/json");
		xobj.open("GET", path, true);
		xobj.onreadystatechange = function() {
			if (xobj.readyState == 4 && xobj.status == "200") {
				callback(xobj.responseText);
			}
		};
		xobj.send(null);
	},
	// Override dom generator.
	getDom: function() {
    this.messagePull(function(response) {
			self.config.compliments = JSON.parse(response);
			self.updateDom();
		});
		var wrapper = document.createElement("div");
		wrapper.innerHTML = this.config.text;
		return wrapper;
	}
});
