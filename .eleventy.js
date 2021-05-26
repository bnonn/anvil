module.exports = function (eleventyConfig) {
	// Watch CSS
	eleventyConfig.addPassthroughCopy("assets");

	// Add shortcode for mailing address

	eleventyConfig.addShortcode("mailingAddress", (multiline = false) => exports.mailingAddress(multiline = false));
};