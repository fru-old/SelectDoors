var fs   = require('fs');
var path = require('path');
var main = path.join(__dirname, '..', '..');
var json = path.join(main, 'package.json');

module.exports = function(callback){

	fs.readFile(json, function(err, data){
		var views  = JSON.parse(data)['initial-views'];
		var result = '';
		var index  = 0;

		(function iterate(){
			if(index >= views.length){
				return callback(result);
			}
			var view = path.join(main, views[index]);
			fs.readFile(view, function(err, data){
				if(!err)result += data || '';
				index++;
				iterate();
			});
		}());
	});
};
