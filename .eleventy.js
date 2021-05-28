module.exports = function (eleventyConfig) {
	// Watch CSS
	eleventyConfig.addPassthroughCopy("assets/scripts");
	eleventyConfig.addPassthroughCopy("assets/images");
	eleventyConfig.addPassthroughCopy("assets/anvl.css");

	// Add shortcode for mailing address

	eleventyConfig.addShortcode("mailingAddress", (multiline = false) => exports.mailingAddress(multiline = false));
};