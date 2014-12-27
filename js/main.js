NProgress.start() 
var main = function(){
	NProgress.inc()
	$.ajax({
		url:'https://api.myjson.com/bins/3uwf3'
	}).done(function(response){
		NProgress.set(0.7);
		var data = response.data;
		utils.appendTemplate(data);
		utils.showFooter();	
		NProgress.done()	
		addHandler();	
			
	})
	
	
};  

var addHandler= function(){
	$('.showModal').click(function(){
		var url= $(this).attr("url"),iframe=$('#modal1 iframe'),openParam=$(this).attr("showParam");
		if(openParam === "true"){
			iframe.html('');
			iframe.attr("src",url);
			$('#modal1').openModal();	
		}else{
			window.open(url);
		}
	});
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
					'<a href="#" showParam=false url="'+data.imdbLink+'"+ title="imdb rating: '+data.imdbRating+' " class="showModal"><img src="img/imdb.jpg"></a>'+
					'<a href="#" showParam=true url="'+data.rtLink+'" class="showModal" title="rotten tomatoes rating : '+data.rtRating+' "><img src="img/rt.jpg"></a>'+
				'</div>'+
			'</li>';
		return template
	},
	showFooter:function(){
		$('footer').show();
	}
}

$(document).ready(main);