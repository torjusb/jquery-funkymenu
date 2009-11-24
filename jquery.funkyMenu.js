(function ($) {
	$.fn.funkyMenu = function () {
		return this.each( function () {
			var $nav = $(this),
				$lists = $nav.children('li'),
				$anchors = $nav.find('> li a'),
				$subAnchors = $lists.find('li'),
				$subHovers = $subAnchors.children('span');
				
			$nav.after('<span id="bg-easer" />');
			var $easer = $('#bg-easer');			
			if ($lists.filter('.tempActive').length > 0) {
				$easer.animate({
					width : parseInt($lists.filter('.tempActive').width()),
					left : parseInt($lists.filter('.tempActive').offset().left) - parseInt($nav.offset().left)
				}, 500, 'linear', function () {
					$lists.filter('.tempActive').children('ul').slideDown('fast');
				});
			}
			
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
					
				$this.addClass('current');
				$lists.removeClass('childless-tempActive');
				$subHovers.hide();
								
				$easer.stop().animate({
					width: parseInt($this.outerWidth()),
					left: parseInt($this.offset().left) - parseInt($nav.offset().left)
				});
				
				if (!$this.parent().hasClass('tempActive')) {
					if (doSlide > 0) {
						$lists.filter('.tempActive').children('ul').slideUp('fast', function () {
							$sub.slideDown('fast');
						});
					} else {
						$sub.slideDown('fast');
					}
					$lists.removeClass('tempActive');
				}	
			}, function () {							
				if ($(this).siblings('ul').length > 0) {
					$(this).parent().addClass('tempActive');
				} else {
					$(this).parent().addClass('childless-tempActive');
				}
				$anchors.removeClass('current');
				$lists.filter(':not(.tempActive)').children('ul').hide();
			});
		});
	};
})(jQuery);