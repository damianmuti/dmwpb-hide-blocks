import { __ } from '@wordpress/i18n';
import { useState } from "react";
import { 
  PanelRow,
	BaseControl, 
	CheckboxControl
} from "@wordpress/components";


const DMWPBChecklistControl = ( props ) => {
  const conditionsList = props.conditions;

  const [ conditions, setConditions ] = useState( [ ...props.attributes.dmwpb__hideBlockConditions ] );

  const setChecklistValues = (event, role) => {
    event ? setConditions( [ ...conditions, role ] ) : setConditions( conditions.filter( item=>item !== role ) );	
  }

  props.setAttributes({
    dmwpb__hideBlockConditions: conditions ?? []
  })

  return (
    <BaseControl 
      __nextHasNoMarginBottom
    >
      { conditionsList && conditionsList.map( ( item, index ) => 
        <>
          {/* { Create a header label for the default conditions } */}
          { index === 0 && (
            <div class="components-panel__row dmwpb__row--label">
              <span class="components-base-control__label">
                { __( 'By status', 'dmwpb-hide-blocks' ) }
              </span>
            </div>
          )}

          {/* { Create a header label for the user roles } */}
          { index > 1 && index === 2 && ( // Hardcoded since default conditions are 2
            <div class="components-panel__row dmwpb__row--label">
              <span class="components-base-control__label">
                { __( 'By role', 'dmwpb-hide-blocks' ) }
              </span>
            </div>
          )}
          
          <PanelRow>
            <CheckboxControl
              __nextHasNoMarginBottom
              label={ item.name }
              value={ item.role}
              help={ item.help ? __( `${item.help}`, 'dmwpb-hide-blocks' ) : undefined }
              checked={ props.attributes.dmwpb__hideBlockConditions.includes( item.role ) }
              onChange={ ( e ) => { setChecklistValues( e, item.role ) } }
            />
          </PanelRow>
        </>
      ) }
      
    </BaseControl>
  )
}
export default DMWPBChecklistControl;