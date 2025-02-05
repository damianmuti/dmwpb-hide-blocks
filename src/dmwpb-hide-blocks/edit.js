import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { 
	InspectorControls, 
	BlockControls 
} from "@wordpress/block-editor";
import { 
	ToggleControl, 
	PanelBody, 
	PanelRow, 
	ToolbarGroup, 
	ToolbarButton,
} from "@wordpress/components";
import { ReactComponent as pluginIcon } from './assets/icon.svg';
import './stores/store.js'
import DMWPBChecklistControl from './components/checklist.js';



/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';





/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
function addHideInspectorControls( BlockEdit ) {
	return ( props ) => {
		const setHideBlock = ( value ) => {
			props.setAttributes({
				dmwpb__hideBlock: value
			});

			// Reset all settings
			if(!value) {
				props.setAttributes({
					dmwpb__hideBlockHasConditions: false
				});

				props.setAttributes({
					dmwpb__hideBlockConditions: []
				});
			}
		};

		const setHideBlockHasConditions = ( value ) => {
			props.setAttributes({
				dmwpb__hideBlockHasConditions: value
			});

			// Reset conditions
			if(!value) {
				props.setAttributes({
					dmwpb__hideBlockConditions: []
				});
			}
		};

		// Retrieve the conditions list from the custom store
		const conditionsList = wp.data.select('dmwpb-hide-blocks/conditions').getConditions();
		const activeConditionsCount = props.attributes.dmwpb__hideBlockConditions.length; 
		
		return (
			<>
				<BlockEdit { ...props } />

				{/* { Settings for the sidebar } */}
				<InspectorControls>
					<PanelBody 
						title="Show/Hide settings" 
						icon={ pluginIcon } 
						initialOpen={ props.attributes.dmwpb__hideBlock ? true : false } 
						className="dmwpb__panel"
					>
						<PanelRow>
							<ToggleControl
								__nextHasNoMarginBottom
								label={ __( 'Hide this block?', 'dmwpb-hide-block' ) }
								help={ __( 
									'Set to true to hide this block on the front-end, but keep it visible in the editor.',
									'dmwpb-hide-block' 
								) }
								checked={ props.attributes.dmwpb__hideBlock }
								onChange={ setHideBlock }
							/>
						</PanelRow>

						{ props.attributes.dmwpb__hideBlock && (
							<PanelRow>
								<ToggleControl
								__nextHasNoMarginBottom
								label={ __( 'Set visibility conditions', 'dmwpb-hide-block' ) }
								help={ __( 
									'Choose who to hide this block from.',
									'dmwpb-hide-block' 
								) }
								checked={ props.attributes.dmwpb__hideBlockHasConditions }
								onChange={ setHideBlockHasConditions }
							/>
							</PanelRow>
						) }

						{ props.attributes.dmwpb__hideBlockHasConditions && (
							<PanelRow className='dmwpb__row--conditions'>
								<DMWPBChecklistControl { ...props } conditions={ conditionsList } />
							</PanelRow>
						) }

					</PanelBody>
				</InspectorControls>
				
				{/* { Settings for the toolbar } */}
				<BlockControls>
						<ToolbarGroup>
							{ props.attributes.dmwpb__hideBlock && (
								<ToolbarButton
									icon={ pluginIcon }
									label={ 
										__( 
											`This block is hidden on the front-end${ activeConditionsCount > 0 ? ' under ' + activeConditionsCount + ( activeConditionsCount === 1 ? ' condition.': ' conditions.' ) : '.' }`, 'dmwpb-hide-block' ) 
									}
									data-active-conditions={ activeConditionsCount }
									className="dmwpb__toolbar-icon"
									disabled
								/>
							) }
						</ToolbarGroup>
				</BlockControls>
			</>
		)
	}
}
addFilter(
	'editor.BlockEdit',
	'dmwpb-hide-blocks/add-hide-inspector-controls',
	addHideInspectorControls
);


/**
 * Add data attribute on the admin side to show an indicator if the block is hidden.
 */
const addDataAttribute = createHigherOrderComponent( ( BlockListBlock ) => {
	return ( props ) => {
		// If the block is not hidden, return the block as-is
		if ( !props.attributes.dmwpb__hideBlock ) {
			return <BlockListBlock { ...props } />;
		}

		const wrapperProps = {
			...props.wrapperProps,
			'data-hidden': true,
		};
		return <BlockListBlock { ...props } wrapperProps={ wrapperProps } />;        
	};
}, 'addDataAttribute' );
addFilter( 
	'editor.BlockListBlock', 
	'dmwpb-hide-blocks/add-data-attribute', 
	addDataAttribute 
);




