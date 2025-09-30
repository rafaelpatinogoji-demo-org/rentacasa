---
description: Improve UI using CSS
auto_execution_mode: 1
---

Step 5 — Redesign UI with Modern RentaCasa Style and Glassmorphism Header

YOU MUST CHECK THE REFERENCE IMAGE IN ui/design.png

IT'S A REFERENCE, you don't have to adhere perfectly to it

Objective:
Transform the current frontend inspired by the RentaCasa design with a fixed glassmorphism header that uses backdrop-filter for a frosted glass translucent effect. Create a visually appealing, professional and modern application.


Instructions for Cascade

Header Glassmorphism Component — CRITICAL

Create a Header component with glassmorphism effect that must be position fixed, top: 0, width: 100%, and z-index: 1000 or higher to remain always visible when scrolling.

Exact CSS properties:
	•	background: rgba(61, 90, 90, 0.7) (dark blue-green with alpha 0.6–0.8)
	•	backdrop-filter: blur(10px) saturate(180%)
	•	-webkit-backdrop-filter: blur(10px) saturate(180%)
	•	border-bottom: 1px solid rgba(255, 255, 255, 0.1)
	•	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)

Header content:
	•	Emoji 🏡 + text "RentaCasa" white bold (24–28px)
	•	Subtitle "Built with Windsurf" rgba(255, 255, 255, 0.7), size 14px
	•	Vertical padding 16–20px
	•	Centered Bootstrap Container with max-width


Adjust Main Layout

Add padding-top: 100px–120px to the body or main container to compensate for the fixed header.


Color Scheme and Brand
	•	Header: dark translucent blue-green.
	•	General background: very light gray #f5f5f5 or #f8f8f8.
	•	Cards: white with subtle shadows, border-radius 12–16px.

Badges: ONLY pastel colors (never bright blue):
	•	Light pink #ffc4d6 (text #b8405e)
	•	Mint green #c4f0e0 (text #2d8b6b)
	•	Light yellow #fff4c4 (text #a89b3d)
	•	Lavender #e4d4f4 (text #7b5a9e)
	•	Peach #ffd4b8 (text #b86f3d)


Results Counter

Below the header: "5555 properties found".
Style: medium gray, font-size 14px, margin-bottom 16px.


FilterSidebar
	•	White background, border-radius 12px, light shadow, padding 24–32px.
	•	Sticky with top: 120px.
	•	Spanish labels bold small: Where?, Type, Bedrooms.
	•	Selects: light gray background #f8f8f8, border-radius 8px, padding 10px 16px.
	•	Search button: pill radius 99em, blue-green background #5a8a8a, white text "🔍 SEARCH", full width. Hover: darker.
	•	Text "Coming soon" below, light gray, centered.


ListingCard
	•	Horizontal cards:
	•	Left image 35–40% width, border-radius left corners, object-fit: cover.
	•	Right content with padding 20px.
	•	Bold black title 18–20px.
	•	Medium gray location 14px below.
	•	2 soft pastel badges (property_type + bedrooms with "beds").
	•	Blue-green bold price 32–36px, right-aligned, "/night" in gray 14px.
	•	Cards with white background, subtle shadow, hover with stronger shadow and translateY(-2px) (200ms transition).


Cards Grid — CRITICAL

⚠️ IMPORTANT: Properties must ALWAYS be displayed in a 2-column grid on desktop.
	•	Use Row + Col md={6} with gap: 24px.
	•	On mobile collapse to 1 column.
	•	Never on desktop should it be displayed in a single column: always 2 columns of horizontal cards.


Professional Typography

Modern sans-serif.
	•	Card titles: bold 18–20px
	•	Locations: 14px
	•	Prices: bold 32–36px
	•	Badges: 13–14px
	•	Filter labels: semibold 14px


Responsive
	•	Fixed header on mobile (adjusted text).
	•	Sidebar collapses or moves to top.
	•	Cards maintain horizontal layout.
	•	Bootstrap breakpoints.


Modern UI Principles with Glassmorphism
	•	backdrop-filter blur + saturate.
	•	Spacing multiples of 4/8.
	•	Subtle shadows.
	•	200–300ms transitions.
	•	Clear visual hierarchy.
	•	Accessible contrast.
	•	Harmonious colors.


Expected result:
A frontend with a fixed translucent glassmorphism header that remains visible when scrolling with blurred content behind it. Clean sidebar, visible counter, and property grid ALWAYS in 2 columns on desktop (1 column on mobile). Modern, cohesive, responsive and professional design.
