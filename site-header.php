<a class="%skip-link" href="#main-content">Skip to main content</a>

<header>
	<div class="@columns &space:tight" style="--threshold:var(--measure);">
		<hgroup>
			<h1>Anvil</h1>
			<h2>A modular approach to laying out websites</h2>
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
	</div>
	<!--@columns-->
	<nav aria-label="secondary">
		<ul class="@reel &suppress:scroller ?suppress:a11y-assist &suppress:clicker &space:tight">
			<li><a href="#0" <?= is_active("developers", $this_page); ?>>Developers</a></li>
			<li><a href="#0" <?= is_active("careers", $this_page); ?>>Careers</a></li>
			<li><a href="#0" <?= is_active("support", $this_page); ?>>Support</a></li>
			<li><a href="#0" <?= is_active("blog", $this_page); ?>>Blog</a></li>
		</ul>
	</nav>
</header>
