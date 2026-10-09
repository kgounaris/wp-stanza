/**
 * stanza/media — desktop / mobile video switch.
 *
 * A video block with a mobile clip is saved without a <source>: both URLs
 * sit in data attributes (data-src, data-mobile-src) so the browser requests
 * nothing until this script picks one. The choice is a media query —
 * data-mobile-media, stamped at render time from stanza.json
 * (settings.media-mobile-query), by default narrow OR portrait viewports —
 * and it is re-evaluated when the viewport crosses it (window resized past
 * the breakpoint, device rotated), swapping the file and poster then.
 * Only one file is ever loaded at a time.
 */
( function () {
	var DEFAULT_QUERY = '(max-width: 768px), (orientation: portrait)';

	function setup( video ) {
		var desktopSrc = video.getAttribute( 'data-src' );
		var mobileSrc = video.getAttribute( 'data-mobile-src' );

		if ( ! desktopSrc || ! mobileSrc ) {
			return;
		}

		var desktopPoster = video.getAttribute( 'poster' ) || '';
		var mobilePoster = video.getAttribute( 'data-mobile-poster' ) || desktopPoster;
		var query = video.getAttribute( 'data-mobile-media' ) || DEFAULT_QUERY;
		var mql = window.matchMedia( query );
		var isMobile = null;

		function apply( mobile ) {
			if ( mobile === isMobile ) {
				return; // no crossing (e.g. a rotation that stays on the same side)
			}
			isMobile = mobile;

			var poster = mobile ? mobilePoster : desktopPoster;
			if ( poster ) {
				video.setAttribute( 'poster', poster );
			} else {
				video.removeAttribute( 'poster' );
			}

			video.src = mobile ? mobileSrc : desktopSrc;
			video.load();

			if ( video.autoplay ) {
				var playing = video.play();
				if ( playing && typeof playing.catch === 'function' ) {
					playing.catch( function () {} ); // autoplay policy: the poster stays
				}
			}
		}

		apply( mql.matches );

		var onChange = function ( e ) {
			apply( e.matches );
		};
		if ( typeof mql.addEventListener === 'function' ) {
			mql.addEventListener( 'change', onChange );
		} else {
			mql.addListener( onChange ); // Safari < 14
		}
	}

	function init() {
		var videos = document.querySelectorAll( 'figure.wp-block-stanza-media video[data-mobile-src]' );
		for ( var i = 0; i < videos.length; i++ ) {
			setup( videos[ i ] );
		}
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}
} )();
