<?php

/**
 * The base configuration for Anvil
 *
 * This file contains the following configurations:
 *
 * * Contact info for the site we're creating
 * * Additional structured markup data
 * * Internal theme data used elsewhere in the template files
 *
 * @package Anvil
 */

// Internal theme constants

define("ANV_REVISION",        "1");
define("ANV_COLOR",           "#b81600");
define("GFONTS",              "Abril+Fatface|IBM+Plex+Sans|IBM+Plex+Mono");

// Site info

define("ANV_TITLE",           "Anvil Templating System", true);
define("ANV_SITENAME",        "Anvil", true);
define("ANV_TAGLINE",         "Blazes, only better", true);


// Contact info

define("COMPANY_NAME",        "Information Highwayman", true);
define("ADDRESS",             "432 Raikes Ave", true);
define("CITY",                "Te Awamutu", true);
#define("REGION",              "", true);
define("POSTCODE",            "3800", true);
define("COUNTRY",             "New Zealand", true);
define("COUNTRY_CODE",        "NZ", true);

define("DEFAULT_PHONE",       "", true);
define("EMAIL",               "bnonn@informationhighwayman.com", true);

#define("FACEBOOK_PROFILE",    "", true);
#define("GOOGLE_PLAY_PROFILE", "", true);
#define( "GOOGLE_PLUS_PROFILE", "", true );
#define( "INSTAGRAM_PROFILE",   "", true );
#define( "LINKEDIN_PROFILE",    "", true );
#define("ITUNES_PROFILE",      "", true);
#define("PATREON_PROFILE",     "", true);
#define("TWITTER_PROFILE",     "", true);
#define("YOUTUBE_PROFILE",     "", true);

// Extra outputs we need; don't edit these unless you're sure

// define("ANV_PATH",            get_template_directory_uri());
// define("ANV_STYLESHEET",      get_stylesheet_uri());
// define("ANV_DEV_STYLESHEET",  get_template_directory_uri() . "/dev/style.css");
// define("ANV_URL",             get_site_url());
define("ANV_VERSION",         "6");
define("ANV_FULL_VERSION",    ANV_VERSION . ANV_REVISION);
define("LOCAL_MAIL",          ADDRESS . ", " . CITY . ", " . POSTCODE);
