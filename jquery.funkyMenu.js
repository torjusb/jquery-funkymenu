(function ($) {
	$.fn.funkyMenu = function () {
		return this.each( function () {
			var $nav = $(this),
				$lists = $nav.children('li'),
				$anchors = $nav.find('> li a'),
				$subAnchors = $lists.find('li');
				
			$nav.after('<span id="bg-easer" />');
			var $easer = $('#bg-easer');
			$easer.css({
				width : parseInt($lists.filter(':first').width()),
				left : parseInt($lists.filter(':first').css('margin-left'))
			});
			
			$subAnchors.hover( function () {
				$(this).children('span').fadeIn();
			}, function () {
				$(this).children('span').fadeOut();
			});
				
			$anchors.hover( function () {
				var $this = $(this),
					$sub = $this.siblings('ul:first'),
					$tempActive = $lists.filter('.tempActive'),
					doSlide = $tempActive.length;
				
				$easer.stop().animate({
					width: parseInt($this.outerWidth()),
					left: parseInt($this.offset().left) - parseInt($nav.offset().left)
				});
				
				$this.addClass('current');
				
				if (!$this.parent().hasClass('tempActive')) {
					if (doSlide > 0) {
						$lists.filter('.tempActive').children('ul').slideUp('fast', function () {
							$sub.slideDown('fast');
						});
					} else {
						$sub.slideDown('fast');
					}
				}
				$lists.removeClass('tempActive');
			}, function () {
				if ($(this).siblings('ul').length > 0) {
					$(this).parent().addClass('tempActive');
				}
				$anchors.removeClass('current');
				$lists.filter(':not(.tempActive)').children('ul').hide();
			});
		});
		
	};
})(jQuery);