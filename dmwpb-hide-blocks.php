<?php
/**
 * Plugin Name:       [DMWPB] Hide Blocks
 * Plugin URL:				https://damianmuti.com
 * Description:       This Wordpress plugin extends Gutenberg core blocks to allow Administrators to hide elements on the front-end, but keep them in the post edit screen.
 * Version:           1.0.2
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            Damian Muti
 * Author URI:        https://damianmuti.com/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       dmwpb-hide-blocks
 *
 * @package CreateBlock
 */

namespace dmwpb_hide_blocks;

if ( !defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( !defined( 'DMWPB_HB_PLUGIN_DIR' ) ) {
	define( 'DMWPB_HB_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function dmwpb_hide_block_init() {
	if( !current_user_can( 'manage_options' ) ) {
		return false;
	}

	// Include dependencies.
	require_once( DMWPB_HB_PLUGIN_DIR . 'inc/api.php' );
	require_once( DMWPB_HB_PLUGIN_DIR . 'inc/render.php' );

	// Register block extension
	register_block_type( __DIR__ . '/build/dmwpb-hide-blocks' );
	
}
add_action( 'init', __NAMESPACE__ . '\dmwpb_hide_block_init' );