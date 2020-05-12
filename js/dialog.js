var modalTriggers = document.querySelectorAll( ".dialog\\:open" ),
	modals = document.querySelectorAll( "dialog" ),
	blurrableEls = document.querySelectorAll( "main" );

function toggleBlur()
{
	// This isn't strictly needed; you can just use the dialog's ::backdrop pseudoelement to put some opacity over the main page by changing its background to something like rgba(0,0,0,.5).

	blurrableEls.forEach( ( el ) =>
	{
		el.classList.contains( "is-blurred" )
			? el.classList.remove( "is-blurred" )
			: el.classList.add( "is-blurred" );
	} );
}

modalTriggers.forEach( ( trigger ) =>
{
	// Listen for clicks that should open a modal
	trigger.addEventListener( "click", () =>
	{
		// Get the target modal from the href or data-target attribute
		var target = trigger.dataset.target || trigger.getAttribute( "href" );
		document.querySelector( target ).showModal();
		toggleBlur();
	} );
} );

modals.forEach( ( modal ) =>
{
	// Register the modal with the polyfill to set up functionality for non-compliant browsers
	dialogPolyfill.registerDialog( modal );

	// Listen for clicks on the modal's close button
	modal
		.querySelector( ".dialog\\:close" )
		.addEventListener( "click", () => modal.close() );

	// Wait for the close event, then remove background blur
	modal.addEventListener( "close", () => toggleBlur() );
} );
