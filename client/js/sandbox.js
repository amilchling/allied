Meteor.startup(function(){
	$(".accordtext a").click(function(event){
		event.preventDefault();
		$(this).siblings("div").first().slideToggle();
		$(this).find("span").toggleClass("foundicon-plus");
		$(this).find("span").toggleClass("foundicon-minus");
		//return false;
	});
}); 