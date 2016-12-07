var request = require('request');

function Worker(data) {
    var self = this;
    this.defaults = {
        init_at: Date.now(),
        access_token: null,
        profile: null
    };

    function sendLikeToMedia(mediaId) {
        var token = self.defaults.access_token;
        var str = 'https://api.instagram.com/v1/media/'+mediaId+'/likes?access_token='+token;

        request.post(str, function (error, response, body) {
            if (!error) { // && response.statusCode == 200
                console.log('SENDMEDIA_RESPONSE: ', body); // Show the HTML for the Google homepage.
            } else {
                console.log('SENDMEDIA_RESPONSE Error: ', error);
            }
        })
    }
    
    this.setToken = function(access_token) {
        this.defaults.access_token = access_token;
    };

    this.setProfile = function(profile) {
        this.defaults.profile = profile;
        console.log('profile: ', profile);
    };
    
    this.startJob = function( ){

        // id: this.defaults.profile._json.data.id
        // https://api.instagram.com/v1/users/{user-id}/media/recent/?access_token=ACCESS-TOKEN

        var token = this.defaults.access_token;
        var id = this.defaults.profile._json.data.id; //this.defaults.profile._json.data.id;

        request('https://api.instagram.com/v1/users/'+id+'/media/recent/?access_token='+token, function (error, response, body) {
            if (!error) { // && response.statusCode == 200
                var data = JSON.parse(body);
                var item = data.data[0];
                console.log('body data: ', data.data[0]); // Show the HTML for the Google homepage.

                sendLikeToMedia(item.id);

            } else {
                console.log('Error: ', error);
            }
        })
    };
}

module.exports = {
    Worker: Worker
};