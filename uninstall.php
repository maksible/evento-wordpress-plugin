<?php

/**
 * Trigger this file on Plugin uninstall
 *
 * @package  Evento
 */

if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	die;
}

/* Clear Database stored data using foreach
$books = get_posts( array( 'post_type' => 'book', 'numberposts' => -1 ) ); -1 means alls

foreach( $books as $book ) {
	wp_delete_post( $book->ID, true );
}
*/
// Access the database via SQL
global $wpdb;
$wpdb->query( "DELETE FROM wp_posts WHERE post_type = 'event'" );
$wpdb->query( "DELETE FROM wp_postmeta WHERE post_id NOT IN (SELECT id FROM wp_posts)" );
$wpdb->query( "DELETE FROM wp_term_relationships WHERE object_id NOT IN (SELECT id FROM wp_posts)" );