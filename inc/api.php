<?php

/**
 * Callback function for custom API endpoint.
 */
function get_block_conditions() {
  $get_roles = wp_roles();

  // Defaults
  $conditions = [
    array(  
      'name' => 'Logged-in users',
      'role' => 'logged-in',
      'help' => 'Hidden from logged-in users.'
    ),
    array(
      'name' => 'Not logged-in users',
      'role' => '!logged-in',
      'help' => 'Hidden from logged-out users.'
    )
  ];

  // Get registered user roles
  if( $get_roles && !empty( $get_roles ) ) {
    $roles = [];

    foreach( $get_roles->get_names() as $role => $name ) {
      $roles[] = array( 'name' => $name, 'role' => $role );
    }

    // Merge registered roles with default values
    $conditions = array_merge($conditions, $roles);
  }

  return $conditions;
}

/**
 * Register custom API endpoint.
 */
add_action( 'rest_api_init', function () {
  register_rest_route( 'dmwpb-hide-blocks/v1', '/block-conditions', array(
    'methods' => 'GET',
    'callback' => __NAMESPACE__ . '\get_block_conditions',
    'permission_callback' => function () {
      // Set endpoint access permissions to Administrators only
      return current_user_can( 'manage_options' );
    }
  ) );
} );