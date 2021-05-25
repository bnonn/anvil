module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy("./scss/style.css");
	eleventyConfig.addWatchTarget("./scss/style.css");
	return {
	};
};