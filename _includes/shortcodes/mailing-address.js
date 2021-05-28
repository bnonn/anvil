/**
 * 
 * @param {boolean} multiline 
 * @returns a mailing address for the site, either inline or as a block
 * 
 */

module.exports = function getMailingAddress(format) {
	const contact = require("../../_data/contact.json");
	return format.multiline
		? `<address>
			${contact.street}<br>
			${contact.city} ${contact.postcode}<br>
			${contact.country}
			</address>`
		: `${contact.street}, ${contact.city}, ${contact.postcode}`;
}