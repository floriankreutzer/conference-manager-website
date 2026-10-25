# PAVUREL public website imagery

These assets are governed editorial visuals for the public Conference Manager website.

## Approval and provenance

- Source package: `PAVUREL_Bildpaket_komplett.zip`.
- Public website use was explicitly approved by the product owner on 29 August 2026.
- The source visuals are AI-generated PAVUREL key visuals from the approved brand/master context.
- They are editorial brand imagery, not documentary photography of a customer site, a real Conference Manager deployment, or customer proof.

## Website derivatives

| Repository asset | Approved source visual | Intended use |
| --- | --- | --- |
| `hero-conference-400.webp` | `04_Conference_Room_Negative_Space.png` | Homepage hero and general conference context |
| `workplace-boardroom-400.webp` | `01_Boardroom_Table_Premium.png` | Workplace Team preparation context |
| `hospitality-service-480.webp` | `06_Hospitality_Service_Details.png` | Workplace hospitality/service context |
| `about-hospitality-400.webp` | `05_Hotel_Reception.png` | About Conference Manager / hospitality context |
| `meeting-room-{640,960,1440}.webp` | `04_Conference_Room_Negative_Space.png` | Responsive homepage hero; the 1440 × 810 variant is also the shared social-preview image |
| `meeting-catering-{480,800}.webp` | `09_Conference_Table_Service_Closeup.png` | Catering preparation and connected workplace detail |
| `meeting-preparation-{640,960,1280}.webp` | Additional AI-generated Pavurel meeting-preparation visual, approved with the website design on 19 October 2026 | Two colleagues preparing a meeting; setup/pilot context |

The additional visual follows the owner's approval for new images in the established
Pavurel direction. It is generated editorial imagery, not a portrait of actual Pavurel
employees or a documented customer workplace. Web derivatives resize and encode the
approved source as WebP at quality 80; responsive CSS controls the crop without adding content.

## Runtime rules

- Preserve the approved composition; do not add customer logos, certifications, metrics, product UI, or unsupported claims to these images.
- Meaningful placements require localized alternative text.
- Keep intrinsic dimensions to reduce layout shift.
- The primary hero may load eagerly when it is the LCP candidate; below-the-fold images remain lazy loaded.
- Do not present these visuals as evidence of implemented customer environments or customer adoption.

Conference Manager remains the product name. `by Pavurel` is a subordinate candidate brand endorsement and does not imply completed company-name, trademark, or domain clearance.
