<?php
/**
 * @package Evento
 */

namespace Evento\Base;

class Deactivate
{
	public static function deactivate() {
		flush_rewrite_rules();
	}
}