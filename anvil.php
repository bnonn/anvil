<?php

/**
 * Set up Anvil with required constants and functions.
 * 
 * @package Anvil
 */

define("ANV_VERSION",         "5");

/**
 * Compare a nav item to the current page and return the
 * appropriate CSS class.
 */

function is_active($page, $current_page)
{
	if ($page == $current_page) {
		return 'class="is:active"';
	}
}
