$(document).ready(function () {

	/* Contact form */
	$('#contact_form').submit(function () {
		$.ajax({
			type: 'POST',
			url: 'contact.php',
			data: {
				name: $('#contact_form input#name').val(),
				email: $("#contact_form input#email").val(),
				text: $("#contact_form textarea").val()
			},
			success: function(data) {
				if ( data == 'sent' ) {
					$('#contact_form .status').html('E-mail has been sent.');
				} else if ( data == 'invalid' ) {
					$('#contact_form .status').html('Your name, email or message is invalid.');
				} else {
					$('#contact_form .status').html('E-mail could not be sent.');					
				}
			},
			error: function () {
				$('#contact_form .status').html('E-mail could not be sent.');
			}
		});
		return false;
	});

	/* Contact map */
	if (typeof(showMap) == 'function') showMap();

	/* Accordion */
	$('.accordion li').each(function () {
		toggle = $(this).children('.toggle');
		toggle.text($(this).hasClass('opened') ? '-' : '+');
	});
	$('.accordion .toggle').click(function () {
		$(this).parent('li').children('p').slideToggle();
		$(this).text(($(this).text() == '-') ? '+' : '-');
		return false;
	});

	/* Tabs */
	$('.tabs .selectors a').click(function () {
		/* Select menu item */
		$('.tabs .selectors li').removeClass('selected');
		$(this).parent('li').addClass('selected');
		/* Display tab */
		$('.tabs .tab').removeClass('selected');
		$('.tabs .tab[data-tab="' + $(this).attr('data-tab') + '"]').addClass('selected');
		return false;
	});

	/* Category filter */
	$('.filter a').click(function () {
		/* Select menu item */
		$('.filter a').removeClass('selected');
		$(this).addClass('selected');
		/* Fade in category */
		$('.filterable li, .filterable li img').fadeTo('slow', 0.4);
		$('.filterable li.' + $(this).attr('data-category') + ', .filterable li.' + $(this).attr('data-category') +' img').stop().fadeTo('slow', 1);
		return false;
	});

	/* Fancybox */
	$('a.fancybox_photo').fancybox({
		'transitionIn'		: 'elastic',
		'padding'			: 0,
		'overlayColor'		: '#000'
	});
	$('a.fancybox_video').fancybox({
		'transitionIn'		: 'elastic',
		'padding'			: 0,
		'overlayColor'		: '#000',
		'type'				: 'iframe'
	});

    /* Recent tweets */
    $('.tweets').each(function () {
	    var user = $(this).attr('data-source');
	    var el = $(this); 
	    $.getJSON('http://twitter.com/statuses/user_timeline.json?screen_name=' + user + '&count=5&callback=?', function(data) {
	        el.children('blockquote').text(data[0].text);
	        el.children('.author').html('<a href="http://twitter.com/' + data[0].user.screen_name + '">@' + data[0].user.screen_name + '</a>');
	        el.children('.time').text(data[0].created_at).prettyDate();
			$('.portfolio, .masonry').not('.no-masonry').masonry();
	    });
    });

	/* Roundabout slider */
	$('#carousel_slider ul').roundabout({
		minOpacity: 1.0,
		easing: 'easeOutQuint',
		duration: 2000,
		autoplay: true,
		autoplayDuration: 5000,
		autoplayPauseOnHover: true,
		responsive: true
	});

	/* Regular slider */
	$('#slider').each(function () {
		setInterval(function () {
			next = $('#slider .selected').addClass('absolute').fadeOut(1000, function () { $(this).removeClass('selected').removeClass('absolute')} ).next();
			if (next.length == 0) next = $('#slider li:first-child');
			next.addClass('selected').fadeIn(1000);
		}, 4000);
	});
	
});

$(window).load(function () {

	/* Masonry */
	$('.portfolio, .masonry').not('.no-masonry').masonry();
	
});
$(window).resize(function () {

	/* Masonry */
	$('.portfolio, .masonry').not('.no-masonry').masonry();
	
}); 