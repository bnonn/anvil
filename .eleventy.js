const mailingAddress = require("./_includes/shortcodes/mailing-address");

module.exports = function (eleventyConfig) {
	// Watch CSS
	eleventyConfig.addPassthroughCopy("assets/scripts");
	eleventyConfig.addPassthroughCopy("assets/images");
	eleventyConfig.addPassthroughCopy("assets/anvl.css");
	eleventyConfig.addWatchTarget("assets/anvl.css");

	// Add shortcode for mailing address
	eleventyConfig.addShortcode("mailingAddress", mailingAddress);
};