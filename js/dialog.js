var modalTriggers = Array.from( document.querySelectorAll( ".\\?open\\(dialog\\)" ) ),
	modals = Array.from( document.querySelectorAll( "dialog" ) ),
	blurrableEls = Array.from( document.querySelectorAll( "main, body>header, body>footer" ) );

function toggleBlur()
{
	// This isn't strictly needed; you can just use the dialog's ::backdrop pseudoelement to put some opacity over the main page by changing its background to something like rgba(0,0,0,.5).

	blurrableEls.forEach( ( el ) =>
	{
		el.classList.contains( 'is\:blurred' )
			? el.classList.remove( 'is\:blurred' )
			: el.classList.add( 'is\:blurred' );
	} );
}

// Listen for clicks that should open a modal

for ( let trigger of modalTriggers )
{
	trigger.addEventListener( "click", ( event ) =>
	{
		// Prevent things like buttons in forms from submitting instead of opening the next modal
		event.preventDefault();

		// Get the target modal from the href or data-target attribute and show it
		var target = trigger.dataset.target || trigger.getAttribute( "href" );
		document.querySelector( target ).showModal();

		// Blur the background for greater effect
		toggleBlur();
	} )
}

// Register modals with the polyfill to set up functionality for non-compliant browsers

for ( let modal of modals )
{
	dialogPolyfill.registerDialog( modal );

	// Listen for clicks on the modal's close button
	modal
		.querySelector( ".\\?close\\(dialog\\)" )
		.addEventListener( "click", () => modal.close() );

	// Wait for the close event, then remove background blur
	modal.addEventListener( "close", () => toggleBlur() );
}
