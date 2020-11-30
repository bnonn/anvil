<a class="%skip-link" href="#main-content">Skip to main content</a>

<header>
	<div class="@columns &space:tight" style="--threshold:var(--measure);">
		<hgroup>
			<h1>Anvil</h1>
			<h2>Algorithmic CSS framework for rapidly laying out websites</h2>
		</hgroup>
		<nav aria-label="main">
			<ul class="@reel &suppress:scroller ?suppress:a11y-assist &suppress:clicker &space:tight">
				<li><a href="/index.php" <?= is_active("home", $this_page); ?>><i class="fas fa-home"></i> Home</a></li>
				<li><a href="#0" <?= is_active("features-and-benefits", $this_page); ?>><i class="fas fa-badge-check"></i> Features &amp; Benefits</a></li>
				<li><a href="#0" <?= is_active("client-success", $this_page); ?>><i class="fas fa-trophy"></i> Client Success</a></li>
				<li><a href="#0" <?= is_active("about", $this_page); ?>><i class="fas fa-info-circle"></i> About</a>
				<li><a href="#0" <?= is_active("contact", $this_page); ?>><i class="fas fa-envelope"></i> Contact</a></li>
			</ul>
		</nav>

		<!-- This is what a secondary nav would look like:

	<nav aria-label="secondary">
		<ul class="@reel &suppress:scroller ?suppress:a11y-assist &suppress:clicker &space:tight">
			<li><a href="#0">Developers</a></li>
			<li><a href="#0">Careers</a></li>
			<li><a href="#0">Support</a></li>
			<li><a href="#0">Blog</a></li>
		</ul>
	</nav> -->

	</div>
	<!--@columns-->
</header>
