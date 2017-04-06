import EmberUploader from 'ember-uploader';

export default EmberUploader.FileField.extend({
  url: '',
    init() {
    this._super(...arguments);
    this.errors = [];
    var _this = this;
    var getUrl = $.getJSON("https://motoshare-v1.appspot.com/api/photo/upload").then(function(message){
    	let uploadUri = Ember.get(message,'message');
    	console.log(uploadUri);
    	_this.setProperties({url: uploadUri});
      })
  },

  filesDidChange (files) {
  	var _this = this;
  	var url = this.get('url');
  	var motorcycleid = this.get('uid');
    const uploader = EmberUploader.Uploader.create({
      url: this.get('url'),
      motorcycleid: this.get('motorcycleid')
    });

    if (!Ember.isEmpty(files)) {
      // this second argument is optional and can to be sent as extra data with the upload
      uploader.upload(files, { motorcycleid });
    }
    uploader.on('progress', function (e) {
      _this.sendAction('onProgress', e);
    });
    uploader.on('didUpload', function (e) {
      _this.sendAction('onComplete', e);
    });
  }
});
