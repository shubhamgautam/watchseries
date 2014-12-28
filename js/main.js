NProgress.start();
var constants={};

var main = function(){
	NProgress.inc()
	$.ajax({
		url:'https://api.myjson.com/bins/3uwf3'
	}).done(function(response){
		NProgress.set(0.7);
		var data = response.data;
		constants.length = data.length;
		utils.appendTemplate(data);
		utils.showFooter();	
		NProgress.done()	
		addHandler();	
			
	})
	
	
};  

var addHandler= function(){
	$('.showModal').click(function(){
		var url= $(this).attr("url"),modal=$('#modal1'),openParam=$(this).attr("showParam"),name=$(this).attr('name');
		modal.empty();
		if(openParam === "true"){
			modal.append(utils.frameTemplate(url));
			modal.openModal();	
		}else{
			modal.append(utils.preloaderTemp);
			modal.openModal();	
			name = name.split(' ').join('+');
			$.ajax({
				url:'http://www.omdbapi.com/?t='+name
			}).done(function(response){		
				//modal.empty();
				modal.append(utils.imdbTemplate(JSON.parse(response)));
				$('.tmplCls img').load(function(){
					$('#modal1 .preloader-wrapper').hide();
					$('#modal1 .tmplCls').show();
				});
			})
		}
	});
	
	
	//feeling lucky logic
	$('.fel-luck').click(function(){
		$('.focused').removeClass('focused');
		var rand = Math.floor(Math.random()*constants.length) + 1;
		var focusElem = $($('#main li')[rand]);
		$('#main li')[rand].scrollIntoView()
		focusElem.addClass('focused');
	});
	
};

var utils ={
	appendTemplate: function(data){
		var me=this,main=$('#main ul');
		for(var x in data){
			var template = me.cardTemplate(data[x]);
			main.append(template)
		}
	},
	cardTemplate: function(data){
		var template = '<li >'+
				'<div class="card">'+
					'<a href="#">'+data.name+'</a>'+
					'<a href="#" showParam=false url="'+data.imdbLink+'"+ title="imdb rating: '+data.imdbRating+' " name="'+data.name+'"  class="showModal"><img src="img/imdb.jpg"></a>'+
					'<a href="#" showParam=true url="'+data.rtLink+'" class="showModal" title="rotten tomatoes rating : '+data.rtRating+' "><img src="img/rt.jpg"></a>'+
				'</div>'+
			'</li>';
		return template
	},
	showFooter:function(){
		$('footer').show();
	},
	frameTemplate: function(url){
		return('<iframe height="100%" width="100%" src="'+url+'"></iframe>')
	},
	preloaderTemp: function(){
		var template ='<div class="preloader-wrapper big active">'+
						'<div class="spinner-layer spinner-blue">'+
						'<div class="circle-clipper left">'+
						'<div class="circle"></div>'+
						'</div><div class="gap-patch">'+
						'<div class="circle"></div>'+
						'</div><div class="circle-clipper right">'+
						'<div class="circle"></div>'+
						'</div>'+
					'</div>';
		return template			
	},
	imdbTemplate: function(data){
		var template = '<div class="col s12 m8 tmplCls offset-m2 l6 offset-l3" style="display:none">'+
						'<div class="card-panel grey lighten-5 z-depth-1">'+
						'<div class="row">'+
						'<div class="col s5 ">'+
						'<img src="'+data.Poster+'" alt="" class=" responsive-img">' +
					'</div>'+
					'<div class="col s6">'+
					  '<div class="row"><h3>'+data.Title+'</h3></div>'+
					  '<div class="row">Genre: <span class="val">'+data.Genre+'</span></h3></div>'+
					  '<div class="row">Rating: <span class="val">'+data.imdbRating+'</span></div>'+
					  '<div class="row">imdb Votes: '+data.imdbVotes+'</div>'+
					  '<br>'+
					  '<p><b>Plot: </b> '+data.Plot+'</p>'
					'</div>'
				  '</div>'+
				'</div>'+
			  '</div>';
		return template;	  
  
	
	}
}


$(document).ready(main);