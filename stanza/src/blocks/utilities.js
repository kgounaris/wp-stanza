
import { subscribe, select } from '@wordpress/data';

/**
 * Returns SVG HTML
 */
export function useFetchSvg(url, isSvg, svgWidth, setAttributes, mediaSvgHTML, abortRef) {
	return () => {
		setAttributes({mediaSvgHTML: ''});
		if (!isSvg) return;

		// Abort any in-flight request
		if (abortRef.current) abortRef.current.abort();
		const controller = new AbortController();
		abortRef.current = controller;

		const style = svgWidth ? `<svg style="width:${svgWidth}%;height:auto;"` : '<svg';

		(async () => {
			try {
				const res = await fetch(url, { signal: controller.signal, credentials: 'same-origin' });
				if (!res.ok) throw new Error(`HTTP ${res.status}`);
				const raw = await res.text();
				//console.log(raw);
				setAttributes({mediaSvgHTML: raw.replace(/<\?xml\b[^?]*\?>/gi, '').replace('<svg', style)});

			} catch (e) {
				// Fallback to <img> rendering if fetch/sanitize fails
				setAttributes({mediaSvgHTML: ''});
				console.warn('SVG inline failed:', e);
			}
		})();

		// cleanup (same as useEffect return)
		return () => controller.abort();
	};
}

/**
 * Disable core's text blocks when certain block is out of focus
 */
// pass the block name you care about, e.g. 'stanza/free-text'
export const monitorBlockFocus = (blockName) => {
	const { subscribe, select } = wp.data;

	subscribe(() => {
		const editor = select('core/block-editor');
		const selectedId = editor.getSelectedBlockClientId();

		let isInsideTarget = false;

		if (selectedId) {
			// 1) selected block itself
			if (editor.getBlockName(selectedId) === blockName) {
				isInsideTarget = true;
			} else {
				// 2) or any ancestor of the selected block
				const parents = editor.getBlockParents(selectedId, true); // include all the way to root
				isInsideTarget = parents.some((pid) => editor.getBlockName(pid) === blockName);
			}
		}

		const disableCoreBlocks = !isInsideTarget;

		const items = document.querySelectorAll(
			'.editor-block-list-item-heading, ' +
			'.editor-block-list-item-list, ' +
			'.editor-block-list-item-table, ' +
			'.editor-block-list-item-quote'
		);

		items.forEach((item) => {
			if (disableCoreBlocks) {
				item.style.pointerEvents = 'none';
				item.style.opacity = '0.4';
				item.setAttribute('aria-disabled', 'true');
			} else {
				item.style.pointerEvents = '';
				item.style.opacity = '';
				item.removeAttribute('aria-disabled');
			}
		});
	});
};
