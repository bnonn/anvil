/**
 * Watch reels and check if they overflow, then apply some extra
 * space to them so they don't look silly.
 */

function initReels()
{
	"use strict";
	const reelClass = '\\@reel';
	const reels = Array.from( document.querySelectorAll( `.${reelClass}` ) );
	const toggleOverflowClass = el =>
	{
		el.classList.toggle( 'is\\:overflowing', el.scrollWidth > el.clientWidth );
	};

	for ( let reel of reels )
	{
		if ( 'ResizeObserver' in window )
		{
			new ResizeObserver( entries =>
			{
				toggleOverflowClass( entries[0].target );
			} ).observe( reel );
		}

		if ( 'MutationObserver' in window )
		{
			new MutationObserver( entries =>
			{
				toggleOverflowClass( entries[0].target );
			} ).observe( reel, { childList: true } );
		}

		reel.querySelectorAll( "[rel]" ).forEach( button =>
		{
			button.addEventListener( "click", () => reelScroll( event ) )
		} );
	}
}

/**
 * When a next or prev button is clicked, figure out the direction and move to
 * the next appropriate slide.
 */

function reelScroll( event )
{
	"use strict";

	const reel = event.currentTarget.parentNode;

	// check that we actually have an active item
	if ( !reel.querySelector( ".has\\:focus" ) )
		reel.firstElementChild.classList.add( "has\\:focus" )

	const dir = event.currentTarget.getAttribute( "rel" ),
		reelItems = reel.querySelectorAll( ":scope > *" ),
		activeItem = reel.querySelector( ".has\\:focus" ),
		prevButton = reel.querySelector( "[rel='prev']" );

	let focusIndex = [].slice // we're going to need the active element index
		.call( reelItems ) // treat carouselItems as an array
		.indexOf( activeItem ); // get the index



	/**
	 * Figure out which direction we're clicking based on the next and prev
	 * buttons, and update the index to stay current.
	 */

	switch ( dir )
	{
		case "next":
			focusIndex === reelItems.length - 1
				? focusIndex = 0
				: focusIndex++;
			break;
		case "prev":
			focusIndex === 0
				? focusIndex = reelItems.length - 1
				: focusIndex--;
			break;
	}
	// event.currentTarget.blur(); // buttons are silly; we don't want a persistent focus state

	/**
	 * Focus the new slide based on the index we calculated.
	 */

	activeItem.classList.remove( "has\\:focus" );
	reelItems[focusIndex].classList.add( "has\\:focus" );
	reelItems[focusIndex].focus();

	/**
	 * Unhide the prev button for new slides, so we can go back, but hide it
	 * again if we're back to slide 0.
	 */

	focusIndex > 0
		? prevButton.disabled = "false"
		: prevButton.disabled = "true";
}

initReels();
