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


/**
 * Add custom hide settings to blocks.
 *
 * @param {Object} settings The block settings for the registered block type.
 * @return {Object}         The modified block settings.
 */
function addHideAttributes( settings ) {
	// Add settings for all blocks.
	settings.attributes = {
		...settings.attributes,
		dmwpb__hideBlock: {
			type: 'boolean',
			default: false,
		},
		dmwpb__hideBlockHasConditions: {
			type: 'boolean',
			default: false,
		},
		dmwpb__hideBlockConditions: {
			type: 'array',
			default: '',
		},
	};

	return settings;
}
addFilter(
	'blocks.registerBlockType',
	'dmwpb-hide-blocks/add-hide-attributes',
	addHideAttributes
);
