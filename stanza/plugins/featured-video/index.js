(function ($) {
	"use strict";
	
	function initMetabox($box) {
		const $choose = $box.find("[data-featured-video-choose]");
		const $remove = $box.find("[data-featured-video-remove]");
		const $id     = $box.find("[data-featured-video-id]");
		const $prev   = $box.find("[data-featured-video-preview]");

		if (!$choose.length || !$remove.length || !$id.length || !$prev.length) return;
		if (!window.wp || !wp.media) return;

		let frame = null;

		function setPreview(url) {
			if (!url) {
				$prev.html("<em style='color:#666;'>" + (FeaturedVideoMetabox?.noPreview || "No preview available.") + "</em>");
				return;
			}

			$prev.html(
				"<video controls style='max-width:100%; height:auto;' preload='metadata'>" +
					"<source src='" + String(url).replace(/'/g, "&#039;") + "' />" +
				"</video>"
			);
		}

		$choose.on("click", function (e) {
			e.preventDefault();

			if (frame) {
				frame.open();
				return;
			}

			frame = wp.media({
				title: (FeaturedVideoMetabox?.selectTitle || "Select Featured Video"),
				button: { text: (FeaturedVideoMetabox?.selectBtn || "Use this video") },
				library: { type: "video" },
				multiple: false
			});

			frame.on("select", function () {
				const attachment = frame.state().get("selection").first().toJSON();
				$id.val(attachment.id || "");
				$remove.prop("disabled", false);
				setPreview(attachment.url);
			});

			frame.open();
		});

		$remove.on("click", function (e) {
			e.preventDefault();
			$id.val("");
			$remove.prop("disabled", true);
			$prev.html("<em style='color:#666;'>" + (FeaturedVideoMetabox?.emptyText || "No video selected.") + "</em>");
		});
	}

	// Works for both Classic + Gutenberg (metaboxes can be injected later)
	$(document).ready(function () {
		$("[data-featured-video-metabox='1']").each(function () {
			initMetabox($(this));
		});
	});

	// Extra safety for Gutenberg: re-scan after changes
	$(document).on("click", function () {
		$("[data-featured-video-metabox='1']").each(function () {
			if (!$(this).data("fv-init")) {
				$(this).data("fv-init", true);
				initMetabox($(this));
			}
		});
	});
})(jQuery);
