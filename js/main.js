var main = function(){
	$.ajax({
		url:'https://api.myjson.com/bins/1n61r'
	}).done(function(response){
		var data = response.data;
		debugger;
		utils.appendTemplate(data);
		
	})
};

var utils ={
	appendTemplate: function(data){
		var me=this,main=$('#main ul');
		for(var x in data){
			var template = me.template(data[x]);
			main.append(template)
		}
	},
	template: function(data){
		var template = '<li >'+
				'<div class="card">'+
					'<a href="#">'+data.name+'</a>'+
					'<a href="'+data.imdbLink+'"+ title="imdb rating: '+data.imdbRating+' "><img src="img/imdb.jpg"></a>'+
					'<a href="'+data.rtLink+'" title="rotten tomatoes rating : '+data.rtRating+' "><img src="img/rt.jpg"></a>'+
				'</div>'+
			'</li>';
		return template
	}
}

$(document).ready(main);