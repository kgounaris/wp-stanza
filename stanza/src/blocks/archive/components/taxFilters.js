import { PanelBody, CheckboxControl, Spinner } from '@wordpress/components';

export default function TaxFiltersPanelBody({ taxonomies, termsByTax, filters, setAttributes }) {
	if ( ! taxonomies ) {
		return <Spinner />;
	}

	if ( ! taxonomies.length ) {
		return <p>No taxonomies for this post type.</p>;
	}

	const toggleTerm = ( taxSlug, termId ) => {
		const current = filters?.[ taxSlug ] || [];
		const has = current.includes( termId );
		let nextTaxTerms;

		if ( has ) {
			nextTaxTerms = current.filter( ( id ) => id !== termId );
		} else {
			nextTaxTerms = [ ...current, termId ];
		}

		const nextFilters = {
			...filters,
			[ taxSlug ]: nextTaxTerms,
		};

		if (
			nextFilters[ taxSlug ] &&
			nextFilters[ taxSlug ].length === 0
		) {
			delete nextFilters[ taxSlug ];
		}

		setAttributes( { filters: nextFilters } );
	};

	return taxonomies.map( ( tax ) => {
		const terms = termsByTax[ tax.slug ];

		return (
			<PanelBody
				key={ tax.slug }
				title={ tax.labels?.name || tax.name }
				initialOpen={ false }
			>
				{ ! terms && <Spinner /> }
				{ terms && ! terms.length && <p>No terms.</p> }

				{ terms &&
					terms.length > 0 &&
					terms.map( ( term ) => {
						const taxFilter =
							filters?.[ tax.slug ] || [];
						const checked =
							taxFilter.includes( term.id );

						return (
							<CheckboxControl
								key={ term.id }
								label={ `${ term.name } (${ term.count })` }
								checked={ checked }
								onChange={ () =>
									toggleTerm( tax.slug, term.id )
								}
							/>
						);
					} ) }
			</PanelBody>
		);
	} );
}


