<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title><?= ANV_TITLE; ?></title>
</head>

<body>
	<header class="@stack +masthead">
		<h1 class="@headline +masthead__sitename"><?= ANV_SITENAME; ?></h1>
		<h2 class="
			@headline 
			+masthead__tagline 
			!text-align:center 
			!font-size:2 
			is-visible"><?= ANV_TAGLINE; ?></h2>
	</header>
</body>

</html>
