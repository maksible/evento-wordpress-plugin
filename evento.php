<?php
/**
 * @package Evento
 */
/*
Plugin Name: Evento by Maksible
Plugin URI: https://github.com/maksible/
Description: Evento is quite possibly the best way in the world to <strong>manage your events</strong>, no matter you are using it for College, Organizations or Functions.
Version: 1.0.0
Author: Maksible
Author URI: https://github.com/maksible/
License: GPLv2 or later
Text Domain: evento
*/
/*
This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
Copyright 2005-2018 maksible, Inc.
*/
defined( 'ABSPATH' ) or die( 'Hey, what are you doing here? You silly human!' );
if ( file_exists( dirname( __FILE__ ) . '/vendor/autoload.php' ) ) {
	require_once dirname( __FILE__ ) . '/vendor/autoload.php';
}
use Evento\Activate;
use Evento\Deactivate;
use Evento\Admin\AdminPages;
if ( !class_exists( 'EventoPlugin' ) ) {
	class EventoPlugin
	{
		public $plugin;
		function __construct() {
			$this->plugin = plugin_basename( __FILE__ );
		}
		function register() {
			add_action( 'admin_enqueue_scripts', array( $this, 'enqueue' ) );
			add_action( 'admin_menu', array( $this, 'add_admin_pages' ) );
			add_filter( "plugin_action_links_$this->plugin", array( $this, 'settings_link' ) );
		}
		public function settings_link( $links ) {
			$settings_link = '<a href="admin.php?page=evento_plugin">Settings</a>';
			array_push( $links, $settings_link );
			return $links;
		}
		public function add_admin_pages() {
			add_menu_page( 'Alecaddd Plugin', 'Alecaddd', 'manage_options', 'evento_plugin', array( $this, 'admin_index' ), 'dashicons-store', 110 );
		}
		public function admin_index() {
			require_once plugin_dir_path( __FILE__ ) . 'templates/admin.php';
		}
		protected function create_post_type() {
			add_action( 'init', array( $this, 'custom_post_type' ) );
		}
		function custom_post_type() {
			register_post_type( 'book', ['public' => true, 'label' => 'Books'] );
		}
		function enqueue() {
			// enqueue all our scripts
			wp_enqueue_style( 'mypluginstyle', plugins_url( '/assets/mystyle.css', __FILE__ ) );
			wp_enqueue_script( 'mypluginscript', plugins_url( '/assets/myscript.js', __FILE__ ) );
		}
		function activate() {
			Activate::activate();
		}
	}
	$eventoPlugin = new EventoPlugin();
	$eventoPlugin->register();
	// activation
	register_activation_hook( __FILE__, array( $eventoPlugin, 'activate' ) );
	// deactivation
	register_deactivation_hook( __FILE__, array( 'Deactivate', 'deactivate' ) );
}