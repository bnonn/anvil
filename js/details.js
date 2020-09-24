/**
 * Progressive enhancement to enable links in the <summary> of
 * details elements to expand them. Watches for clicks and 
 * toggles the expanded state.
 */

( function ()
{
	"use strict";
	const className = 'details a.\\?toggle';
	const toggles = Array.from( document.querySelectorAll( `${className}` ) );

	let getClosest = function ( el, selector )
	{
		"use strict";
		for ( ; el && el !== document; el = el.parentNode )
		{
			if ( el.matches( selector ) ) return el;
		}

		return null;
	}

	for ( let i = 0; i < toggles.length; i++ )
	{
		toggles[0].addEventListener( "click", () =>
		{
			const elToToggle = getClosest( toggles[0], "details" );
			elToToggle.toggleAttribute( "open" );
		} );
	}
} )();
