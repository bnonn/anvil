export function mailingAddress(multiline = false) {
	return multiline === true
		? `<address>
				${config.contact.street}<br>
				${config.contact.city} ${config.contact.postcode}<br>
				${config.contact.country}
			</address>`
		: `${config.contact.street}, ${config.contact.city}, ${config.contact.postcode}`
}