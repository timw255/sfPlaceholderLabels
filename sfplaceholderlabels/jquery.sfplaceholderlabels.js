/*!
 * sfPlaceholderLabels - jQuery Content Placeholder Labels for Sitefinity 4.x
 *
 * Copyright (c) 2012 Tim Williamson
 *
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
 *
 * Version : 1.0.0
 * Released: Tuesday 17th January, 2012
 */
(function($){
	$.fn.sfplaceholderlabels = function(options) {
		
		var defaults = {
			//TODO: Options
		};
		
		var options = $.extend(defaults, options);

		return $(this).find('div[placeholderid]').each(function(){
			if (!/_Col\d{2,}$/.exec($(this).attr('placeholderid'))){
				$(this).prepend('<div class="placeholderMeta"><div class="toggle collapse"></div><div class="title">' + $(this).attr("placeholderid") + '</div></div><div class="sfplOverlay" style="display: none;"></div>')
					.find('.toggle.collapse')
					.data('sfplHeight', $(this).height())
					.bind('click.sfPL', contractSection);
			}
		});

		function contractSection() {
			$(this).closest('.RadDockZone').addClass('sfplCollapsed');
			$(this).closest('.RadDockZone').find('.sfplOverlay').toggle();
			$(this).closest('.RadDockZone').css('min-height', '23px !important').animate({ height: '23px' }, 500);
			$(this).removeClass('collapse').addClass('collapsed').unbind('click.sfPL').bind('click.sfPL', expandSection);
		}
		
		function expandSection() {
			$(this).closest('.RadDockZone').animate({ height: $(this).data('sfplHeight') }, 500, function(){
				$(this).closest('.RadDockZone').find('.sfplOverlay').toggle();
				$(this).closest('.RadDockZone').removeClass('sfplCollapsed');
			});
			$(this).closest('.RadDockZone').css('min-height', $(this).attr('sfplHeight')).css('height');
			$(this).removeClass('collapsed').addClass('collapse').unbind('click.sfPL').bind('click.sfPL', contractSection);
		}
	};
})(jQuery);