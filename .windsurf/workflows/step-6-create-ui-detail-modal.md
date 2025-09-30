---
description: Create a detail modal
auto_execution_mode: 1
---

Step 6 — Property Modal (VERY VISUALLY APPEALING)

SEE REFERENCE "ui/modal.png"

Objective:
When the user clicks on a property listing, open a modal that feels premium, minimalist and VERY VISUALLY APPEALING. It should convey attention to detail, clarity and a modern experience.

What should happen
	•	When clicking on a property card, a centered modal opens.
	•	The site background appears slightly dark and blurred (blur) to give prominence to the modal.
	•	The modal has very rounded corners, a sense of lightness and order.


Modal Design (Structure)
	•	Two clearly differentiated parts:
	•	Left: a column with the main image of the establishment, which fills the visible height of the modal and has rounded corners according to the general style.
	•	Right: a column with the complete property details (name, location, type, price, amenities, summary/description, capacity, rules, external link, etc.). Present the information with clear visual hierarchy and generous spacing.


Visual Style (Look & Feel)
	•	VERY VISUALLY APPEALING: clean, modern, elegant, with readable typography, spacing in multiples of 8/12/16, and subtle shadow for depth.
	•	Palette: white base and elegant blue-green accents; badges in soft pastel colors (pink, mint, light yellow, lavender, peach). Avoid bright blues.
	•	Details that elevate the experience:
	•	Soft micro-interactions when opening/closing.
	•	Support text (e.g., "/night", "beds") in medium gray to not compete with the main content.
	•	"View more" button or link to expand long description.


Animation
	•	Smooth and pleasant opening (fade + slight translation/scale) that communicates quality.
	•	Consistent closing. Consider user preferences that disable animations.


Accessibility and Responsive
	•	The modal must work well on mobile and desktop (two columns on desktop; on mobile stack image on top and details below).
	•	Text with adequate contrast and correct keyboard focus.
	•	Clear Close button.


Data and Content (Check endpoint + model)

Check the corresponding endpoint to get the complete information of the selected property (for example, using a listing_id). Make sure to fetch all necessary fields before opening the modal to display it completely without flickering.


Reference data model (useful fields to display):
	•	Identification and links: _id, listing_url
	•	Header: name
	•	Summary / description: summary (and description as backup)
	•	Location: address.street, address.market, address.country
	•	Type: property_type, room_type, bed_type
	•	Capacity: accommodates, bedrooms, beds, bathrooms.$numberDecimal
	•	Price and extras: price.$numberDecimal, cleaning_fee.$numberDecimal, extra_people.$numberDecimal, guests_included.$numberDecimal
	•	Amenities: amenities (select the most relevant for chips/labels)
	•	Policy/Rules: cancellation_policy, house_rules
	•	Main image: images.picture_url
	•	Host (optional): host.host_name, host_response_rate, host_is_superhost


Note: The modal should prioritize essential information first (name, image, price, type, location) and then display additional details in an orderly and pleasant way.


Suggested presentation within the modal
	1.	Right header: Name (highlighted) and brief location.
	2.	Price block: Price per night with "/night" label in secondary text.
	3.	Badges: property type and bedrooms (e.g. "3 beds"), in soft pastels.
	4.	Description: compact summary with option to expand.
	5.	Key amenities: 6–10 beautiful and consistent chips.
	6.	Capacity and rules: clear and concise data (optional icons).
	7.	Action: main button (e.g., "Book") and external link.


Success Criteria
	•	The modal feels premium and VERY VISUALLY APPEALING from the first moment.
	•	The background becomes darkened and blurred to focus attention.
	•	Left image and right details are readable with hierarchy and spacing.
	•	Complete and consistent data with the endpoint consulted for the selected property.
	•	Impeccable responsive behavior (two columns on desktop; stacked on mobile).
