/**
 * Add accessibility functionality and ARIA usefulness to critical elements on
 * the page, assuming they exist.
 */

/**
 * Generalized function to add an attribute to an element as required.
 */

function addAttribute( selector, att, value )
{
	"use strict";

	document.querySelectorAll( selector )
		.forEach( ( el ) =>
			el.setAttribute( att, value ) );
}

addAttribute( "i.fas", "aria-hidden", "true" ); // FontAwesome icons
addAttribute( "a[href='#0']", "role", "button" ); // Anchors acting as buttons
addAttribute( "a[target='_blank']", "rel", "noopener" ); // All links opening in a new tab must be noopeners

/**
 * Add tabindexes to critical elements so they're tappable on mobile.
 */

addAttribute( "dfn[title], abbr[title], .\\@reel:not(.\\?no-a11y-assist) > *", "tabindex", "0" );
