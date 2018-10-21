<?php
/**
 * @package Evento
 */

namespace Evento\Base;

class Activate
{
	public static function activate() {
		flush_rewrite_rules();
	}
}