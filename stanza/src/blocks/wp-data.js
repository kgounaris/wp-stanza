/**
 * WP Core data
 */
export function wpData() {
    return {
        settings: wp.data.select('core/block-editor').getSettings(),
        entityRecord: wp.data.select( 'core' ).getEntityRecord( 'root', 'site' ), // limited for multisites
        user: wp.data.select( 'core' ).getCurrentUser()
    };
}