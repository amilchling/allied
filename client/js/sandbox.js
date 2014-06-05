Meteor.startup(function(){
	$(".accordtext a").click(function(event){
		event.preventDefault();
		$(this).siblings("div").first().slideToggle();
		$(this).find("span").toggleClass("foundicon-plus");
		$(this).find("span").toggleClass("foundicon-minus");
		//return false;
	});

	$("#email-form").on('invalid', function(){
		var invalid_field = $(this).find(['data-invalid']).first();
		invalid_field.focus();
	})
	.on('valid', function(event){
		event.preventDefault();
		event.stopPropagation();
		event.stopImmediatePropagation();
		var inputs = $(this).find('input, #email-textarea');
		var vals = [];
		inputs.each(function(index){
			$(this).prop('disabled', true);
			vals.push($(this).val());
		});

		var $button = $(this).find('button');

		$button.prop('disabled', true);

		Meteor.apply("sendEmail", vals, function(result, error){
			if(error){
				console.log(error);
				alert('Error sending email. Please try again');
			}
			else{
				setTimeout(function(){
					inputs.each(function(indx){
						$(this).prop('disabled', false);
						$(this).val('');
					});
					$button.prop('disabled', false);
				}, 1000);
			}
		});
	});
}); 