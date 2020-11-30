<?php

set_include_path(get_include_path() . PATH_SEPARATOR . $_SERVER['DOCUMENT_ROOT']);
$this_page = "home";
$page_title = "Anvil: algorithmic CSS framework for rapid prototyping";

require_once "anvil.php";
require_once "head.php";

?>

<body class="@center-v">
	<?php require_once "partials/_site-header.php"; ?>
	<main id="main-content">
		<article class="@stack &space:large">

			<?php require_once "pages/_index.php" ?>

		</article>
	</main>

	<?php require_once "partials/_site-footer.php"; ?>
	<?php require_once "partials/_dialog.php"; ?>
	<?php require_once "scripts.php"; ?>

</body>

</html>
