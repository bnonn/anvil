var targetDate = new Date( "2020-03-20 00:00" ),
	countdownEl = {
		days: document.querySelector( ".countdown--days" ),
		hours: document.querySelector( ".countdown--hours" ),
		minutes: document.querySelector( ".countdown--minutes" ),
		seconds: document.querySelector( ".countdown--seconds" ),
	};

renderCountdown();

setInterval( function ()
{
	renderCountdown();
}, 1000 );

function renderCountdown()
{
	var currentDate = new Date().getTime(),
		ticks = ( targetDate - currentDate ) / 1000,
		timeLeft = {
			days: pad( parseInt( ticks / 86400 ) ),
			hours: pad( parseInt( ( ticks % 86400 ) / 3600 ) ),
			minutes: pad( parseInt( ( ticks % 3600 ) / 60 ) ),
			seconds: pad( parseInt( ticks % 60 ) ),
			total: ticks,
		};
	if ( timeLeft.total > 0 )
	{
		countdownEl.days.innerHTML = `
			<span class="countdown__number">${timeLeft.days}</span>
			<span class="countdown__label">days</span>
		`;
		countdownEl.hours.innerHTML = `
			<span class="countdown__number">${timeLeft.hours}</span>
			<span class="countdown__label">hrs</span>
		`;
		countdownEl.minutes.innerHTML = `
			<span class="countdown__number">${timeLeft.minutes}</span>
			<span class="countdown__label">min</span>
		`;
		countdownEl.seconds.innerHTML = `
			<span class="countdown__number">${timeLeft.seconds}</span>
			<span class="countdown__label">sec</span>
		`;
	}
	else
	{
		countdownEl.days.innerHTML = `
			<span class="countdown__number">NO</span>
			<span class="countdown__label">days</span>
		`;
	}
}

function pad( n )
{
	return ( n < 10 ? "0" : "" ) + n;
}
