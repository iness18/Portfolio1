/*
	Overflow by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		settings = {

			// Parallax background effect?
				parallax: true,

			// Parallax factor (lower = more intense, higher = less intense).
				parallaxFactor: 10


		};

		/* Smooth Scrolling
* ------------------------------------------------------ */
var ssSmoothScroll = function() {

	$('.smoothscroll').on('click', function (e) {
		var target = this.hash,
		$target    = $(target);

		e.preventDefault();
		e.stopPropagation();

			$('html, body').stop().animate({
				'scrollTop': $target.offset().top
			}, cfg.scrollDuration, 'swing').promise().done(function () {

				// check if menu is open
				if ($('body').hasClass('menu-is-open')) {
				$('#header-menu-trigger').trigger('click');
			}

				window.location.hash = target;
			});
		});

};

		/* Menu on Scrolldown
	 * ------------------------------------------------------ */
	var ssMenuOnScrolldown = function() {

		var menuTrigger = $('#header-menu-trigger');

		$WIN.on('scroll', function() {

			if ($WIN.scrollTop() > 150) {
				menuTrigger.addClass('opaque');
			}
			else {
				menuTrigger.removeClass('opaque');
			}

		});
	};


  	/* OffCanvas Menu
	 * ------------------------------------------------------ */
   var ssOffCanvas = function() {

	       var menuTrigger = $('#header-menu-trigger'),
	       nav             = $('#menu-nav-wrap'),
	       closeButton     = nav.find('.close-button'),
	       siteBody        = $('body'),
	       mainContents    = $('section, footer');

		// open-close menu by clicking on the menu icon
		menuTrigger.on('click', function(e){
			e.preventDefault();
			menuTrigger.toggleClass('is-clicked');
			siteBody.toggleClass('menu-is-open');
		});

		// close menu by clicking the close button
		closeButton.on('click', function(e){
			e.preventDefault();
			menuTrigger.trigger('click');
		});

		// close menu clicking outside the menu itself
		siteBody.on('click', function(e){
			if( !$(e.target).is('#menu-nav-wrap, #header-menu-trigger, #header-menu-trigger span') ) {
				menuTrigger.removeClass('is-clicked');
				siteBody.removeClass('menu-is-open');
			}
		});

   };

	// Breakpoints.
		breakpoints({
			wide:    [ '1081px',  '1680px' ],
			normal:  [ '841px',   '1080px' ],
			narrow:  [ '737px',   '840px'  ],
			mobile:  [ null,      '736px'  ]
		});

	// Mobile?
		if (browser.mobile)
			$body.addClass('is-scroll');

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Scrolly.
		$('.scrolly-middle').scrolly({
			speed: 1000,
			anchor: 'middle'
		});

		$('.scrolly').scrolly({
			speed: 1000,
			offset: function() { return (breakpoints.active('<=mobile') ? 70 : 190); }
		});

	// Parallax background.

		// Disable parallax on IE/Edge (smooth scrolling is jerky), and on mobile platforms (= better performance).
			if (browser.name == 'ie'
			||	browser.name == 'edge'
			||	browser.mobile)
				settings.parallax = false;

		if (settings.parallax) {

			var $dummy = $(), $bg;

			$window
				.on('scroll.overflow_parallax', function() {

					// Adjust background position.
						$bg.css('background-position', 'center ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');

				})
				.on('resize.overflow_parallax', function() {

					// If we're in a situation where we need to temporarily disable parallax, do so.
						if (breakpoints.active('<=narrow')) {

							$body.css('background-position', '');
							$bg = $dummy;

						}

					// Otherwise, continue as normal.
						else
							$bg = $body;

					// Trigger scroll handler.
						$window.triggerHandler('scroll.overflow_parallax');

				})
				.trigger('resize.overflow_parallax');

		}

	// Poptrox.
		$('.gallery').poptrox({
			useBodyOverflow: false,
			usePopupEasyClose: false,
			overlayColor: '#0a1919',
			overlayOpacity: 0.75,
			usePopupDefaultStyling: false,
			usePopupCaption: true,
			popupLoaderText: '',
			windowMargin: 10,
			usePopupNav: true
		});




	// Activate scrollspy to add active class to navbar items on scroll
	$("body").scrollspy({
			target: "#mainNav",
			offset: 100,
	});


	/* Contact Form
	   * ------------------------------------------------------ */
	   var ssContactForm = function() {

	   	/* local validation */
			$('#contactForm').validate({

				/* submit via ajax */
				submitHandler: function(form) {
					var sLoader = $('#submit-loader');

					$.ajax({
				      type: "POST",
				      url: "inc/sendEmail.php",
				      data: $(form).serialize(),

				      beforeSend: function() {
				      	sLoader.fadeIn();
				      },
				      success: function(msg) {
			            // Message was sent
			            if (msg == 'OK') {
			            	sLoader.fadeOut();
			               $('#message-warning').hide();
			               $('#contactForm').fadeOut();
			               $('#message-success').fadeIn();
			            }
			            // There was an error
			            else {
			            	sLoader.fadeOut();
			               $('#message-warning').html(msg);
				            $('#message-warning').fadeIn();
			            }
				      },
				      error: function() {
				      	sLoader.fadeOut();
				      	$('#message-warning').html("Something went wrong. Please try again.");
				         $('#message-warning').fadeIn();
				      }
			      });
		  		}

			});
	   };



	/* Back to Top
	* ------------------------------------------------------ */
	var ssBackToTop = function() {

		var pxShow  = 500,         // height on which the button will show
		fadeInTime  = 400,         // how slow/fast you want the button to show
		fadeOutTime = 400,         // how slow/fast you want the button to hide
		scrollSpeed = 300,         // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'
		goTopButton = $("#go-top")

		// Show or hide the sticky footer button
		$(window).on('scroll', function() {
			if ($(window).scrollTop() >= pxShow) {
				goTopButton.fadeIn(fadeInTime);
			} else {
				goTopButton.fadeOut(fadeOutTime);
			}
		});
	};

	/* Initialize
	* ------------------------------------------------------ */
	(function ssInit() {

		ssSmoothScroll();
		ssMenuOnScrolldown();
		ssBackToTop();

	})();

})(jQuery);
