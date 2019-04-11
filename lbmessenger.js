Module.register("lbmessenger",{
	// Default module config.
	defaults: {
    		refreshPeriod: 5000,
    		messageURL: 'http://lbmessenger.azurewebsites.net/messages/',
		message: 'Hello'
	},
	//start
	start: function() {

		Log.info("Starting module: " + this.name);
		var self = this;
		self.updateDom();

		setInterval(function() {
			self.updateDom(); // no speed defined, so it updates instantly.
    		}, this.config.refreshPeriod); //perform every at given interval
	},

	messagePull: function(callback) {
		var data = null;

		var xhr = new XMLHttpRequest();
		xhr.withCredentials = false;

		xhr.addEventListener("readystatechange", function () {
			if (this.readyState === 4) {
				callback(this.responseText);
			}
		});

		xhr.open("GET", this.config.messageURL);
		xhr.setRequestHeader("cache-control", "no-cache");

		xhr.send(data);
		
	},
	// Override dom generator.
  getDom: function() {
	var self = this;
	this.messagePull(function(response){
		var pulledMsg = JSON.parse(response);
		pulledMsgText = pulledMsg["message"];
		if(pulledMsgText != self.config.message){
			self.config.message = pulledMsgText;
			self.updateDom();
		}
	});
	var msgNode = document.createTextNode(this.config.message);
	var wrapper = document.createElement("div");
	wrapper.className = "thin xlarge bright pre-line";
	wrapper.appendChild(msgNode);
	return wrapper;
	}
});
