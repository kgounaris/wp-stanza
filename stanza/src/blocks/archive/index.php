<?php
defined( 'ABSPATH' ) || exit;

/**
 * stanza/archive — query container; the actual loop is rendered by the
 * stanza/post-template inner block. Attributes come from block.json.
 */
register_block_type( STANZA_PATH . 'build/blocks/archive' );
