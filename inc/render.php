<?php

/**
 * Filter blocks on the front-end to dynamically show/hide them.
 */
add_filter( 'render_block', function( $block_content, $block ){
	$is_hidden = $block['attrs']['dmwpb__hideBlock'] ?? false;
	$has_conditions = $block['attrs']['dmwpb__hideBlockHasConditions'] ?? false;
	$conditions = $has_conditions ? $block['attrs']['dmwpb__hideBlockConditions'] : false;

	// Early return
	if( !$is_hidden ) {
		return $block_content;
	}

	// Conditions walker
	if( $has_conditions && !empty( $conditions ) ) {
		foreach( $conditions as $condition ) {
			if( is_user_logged_in() ) {
				$user = wp_get_current_user();
				$roles = $user->roles;

				foreach( $roles as $role ) {
					if( $role === $condition ) {
						return false;

						break;
					}
				}
			}

			if( $condition === 'logged-in' ) {
				if( is_user_logged_in() ) {
					return false;
				}
			}

			if( $condition === '!logged-in' ) {
				if( !is_user_logged_in() ) {
					return false;
				}
			}
		}
	} else {
		// There's no conditions set up
		return false;
	}

	return $block_content;
}, 10, 2 );