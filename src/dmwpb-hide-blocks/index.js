/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { addFilter } from '@wordpress/hooks';


/**
 * Internal dependencies
 */
import './edit';
import { allowedBlocks, defaultAttributes } from './helpers';


/**
 * Add custom hide settings to blocks.
 *
 * @param {Object} settings The block settings for the registered block type.
 * @return {Object}         The modified block settings.
 */
function addHideAttributes( settings, name ) {

	// If the block is not allowed, return the settings as-is
	if ( allowedBlocks.indexOf( name ) === -1 ) {
		return settings;
	}

	// Add settings for all blocks.
	settings.attributes = {
		...settings.attributes,
		...defaultAttributes
	};

	return settings;
}
addFilter(
	'blocks.registerBlockType',
	'dmwpb-hide-blocks/add-hide-attributes',
	addHideAttributes
);
