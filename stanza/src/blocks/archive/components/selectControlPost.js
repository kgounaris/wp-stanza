import { __ } from '@wordpress/i18n';
import { useMemo } from '@wordpress/element';
import { FormTokenField } from '@wordpress/components';

export default function SelectControlPost({ safePosts, selectedPostIds, setAttributes }) {

	const { suggestions, labelToIdMap, idToLabelMap } = useMemo( () => {
		const suggestions = [];
		const labelToIdMap = {};
		const idToLabelMap = {};

		safePosts
			.filter( ( p ) => p && typeof p.id === 'number' )
			.forEach( ( p ) => {
				const title = p.title?.rendered || __( '(no title)', 'stanza' );
				const label = `${ title } (#${ p.id })`;

				suggestions.push( label );
				labelToIdMap[ label ] = p.id;
				idToLabelMap[ p.id ] = label;
			} );

		return { suggestions, labelToIdMap, idToLabelMap };
	}, [ safePosts ] );

	return (
		<FormTokenField
			label={ __( 'Select posts', 'stanza' ) }
			value={ ( selectedPostIds ?? [] )
				.map( ( id ) => idToLabelMap[ id ] )
				.filter( Boolean ) }
			suggestions={ suggestions }
			disableCustomTokens
			onChange={ ( tokens ) => {
				const ids = ( tokens ?? [] )
					.map( ( label ) => labelToIdMap[ label ] )
					.filter( ( id ) => typeof id === 'number' );

				// optional: de-dupe
				setAttributes( { selectedPostIds: Array.from( new Set( ids ) ) } );
			} }
		/>
	);
}