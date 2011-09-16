/*!
 * jCarousel AutoScroll Plugin v@VERSION
 * http://sorgalla.com/jcarousel/
 *
 * Copyright 2011, Jan Sorgalla
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * or GPL Version 2 (http://www.opensource.org/licenses/gpl-2.0.php) licenses.
 *
 * Date: @DATE
 */
(function($, window) {

    $.jcarousel.create('jcarousel.autoscroll', {
        options: {
            scroll:   1,
            interval: 3000,
            autostart: true
        },
        timer: null,
        paused: false,
        _init: function() {
            var self = this;
            this.carousel().bind('jcarouseldestroy', function() {
                self.stop();
            });

            if (this.option('autostart')) {
                this._start();
            }
        },
        _start: function() {
            this.stop();

            var self = this,
                carousel = this.carousel(),
                scroll = this.option('scroll');

            if (carousel.size() === 0) {
                return this;
            }

            this.timer = window.setInterval(function() {
                if (!self.paused) {
                    carousel.jcarousel('scrollBy', scroll);
                }
            }, this.option('interval'));

            return this;
        },
        play: function() {
            this._start();
            this.carousel().jcarousel('scrollBy', this.option('scroll'));

            return this;
        },
        pause: function() {
            this.paused = true;
            return this;
        },
        resume: function() {
            this.paused = false;
            return this;
        },
        stop: function() {
            if (this.timer) {
                this.timer = window.clearInterval(this.timer);
            }

            return this;
        }
    });

})(jQuery, window);
