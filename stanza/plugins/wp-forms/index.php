<?php


add_filter( 'wpforms_frontend_form_data', function( $form_data ) {
    // Add to ALL forms:
    $form_data['settings']['submit_class'] =
        trim( ($form_data['settings']['submit_class'] ?? '') . ' wp-block-button__link wp-element-button' );

    return $form_data;
});