/*!
* sfPlaceholderLabels - jQuery Content Placeholder Labels for Sitefinity 4.x
*
* Copyright (c) 2012 Tim Williamson
*
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl-2.0.html
*
* Version : 1.1.1
* Released: Friday 27th January, 2012
*/
(function ($) {
    $.fn.sfplaceholderlabels = function (options) {

        this.data('sfPL', {
            labelsVisible: true
        });

        var defaults = {
            initVisible: true,
            collapseEnabled: true,
            expandOnHide: true
        },
        options = $.extend(defaults, options),
        data = this.data('sfPL');

        if (options.initVisible == false) {
            data.labelsVisible = false;
        }

        $(document).bind('keydown.sfPL', listener);

        return this.find('div[placeholderid]').each(function () {

            var $radDockZone = $(this);

            if (!/_Col\d{2,}$/.exec($radDockZone.attr('placeholderid'))) {

                $radDockZone.data('title', $radDockZone.attr('placeholderid'));

                $radDockZone.prepend('<div class="placeholderMeta"><div class="title">' + $radDockZone.data('title') + '</div>');

                if (options.collapseEnabled == true) {
                    $radDockZone.find('.placeholderMeta').prepend('<div class="toggle collapse"></div>').after('<div class="sfplOverlay" style="display: none;"></div>')
					    .find('.toggle.collapse')
					    .bind('click.sfPL', contractSection);
                }

                if (options.initVisible == false) {
                    $radDockZone.attr('title', $radDockZone.data('title'));
                    $radDockZone.find('.placeholderMeta').toggle();
                }
            }
        });

        function contractSection() {

            var $radDockZone = $(this).closest('.RadDockZone');
            $radDockZone.data('oldHeight', $radDockZone.innerHeight());

            $radDockZone.addClass('sfplCollapsed');
            $radDockZone.find('.sfplOverlay').toggle();

            if ($radDockZone.hasClass('zeDockZoneEmpty')) {
                $radDockZone.attr('style', 'min-height:23px !important;min-width:10px')
            }

            $radDockZone.stop().animate({ height: '23px' }, 250, function () {
                $(this).find('.toggle.collapse').removeClass('collapse').addClass('collapsed').unbind('click.sfPL').bind('click.sfPL', expandSection);
            });
        }

        function expandSection() {

            var $radDockZone = $(this).closest('.RadDockZone');

            $radDockZone.stop().animate({ height: $radDockZone.data('oldHeight') }, 500, function () {
                $radDockZone.find('.sfplOverlay').toggle();
                $radDockZone.removeClass('sfplCollapsed');

                if ($radDockZone.hasClass('zeDockZoneEmpty')) {
                    $radDockZone.attr('style', 'min-height:' + $radDockZone.data('oldHeight') + 'px !important;min-width:10px;');
                }

                $(this).find('.toggle.collapsed').removeClass('collapsed').addClass('collapse').unbind('click.sfPL').bind('click.sfPL', contractSection);
            });
        }

        function listener(event) {

            if (event.keyCode == 90) {

                if (options.expandOnHide == true) {
                    $('.toggle.collapsed').each(expandSection);
                }

                if (data.labelsVisible) {
                    $('.placeholderMeta').each(function () {
                        var $radDockZone = $(this).closest('.RadDockZone');

                        $radDockZone.attr('title', $radDockZone.data('title'));
                        $(this).hide();
                    });
                    data.labelsVisible = false;
                } else {
                    $('.placeholderMeta').each(function () {
                        var $radDockZone = $(this).closest('.RadDockZone');

                        $radDockZone.attr('title', '');
                        $(this).show();
                    });
                    data.labelsVisible = true;
                }
            }
        }
    };
})(jQuery);