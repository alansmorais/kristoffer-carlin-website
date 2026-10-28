# Kristoffer Carlin website — acceptance checklist

## Brand and public site
- [x] Norwegian-first structure and English toggle foundation.
- [x] Forest green, moss, ivory, ochre/yellow, terracotta and dark-earth palette from Kristoffer's references.
- [x] Distinct, grounded, energetic, warm, Nordic and human design—not generic spa/clinical styling.
- [x] Main navigation for Home, About, Offerings, Coaching, Tantra, Menswork, Spirituality, Activities, Journal, Testimonials and Contact.
- [x] Responsive layout and mobile menu foundation.
- [ ] Replace stock images with approved photos supplied by Kristoffer.
- [ ] Finalize all Norwegian content and review English translations.
- [ ] Confirm contact details, social links, legal/privacy text and cookie/analytics decisions.

## Workshops and reservations
- [ ] Admin can create, edit, publish/unpublish and remove workshops.
- [ ] Workshop fields include bilingual title/summary, date/time, venue, price, capacity, image and status.
- [ ] Dedicated workshop detail and booking view.
- [ ] Reservations automatically accepted only while capacity remains.
- [ ] Server-side locking/transaction strategy prevents overbooking under concurrent requests.
- [ ] Duplicate submission protection, cancellation policy and attendee management.
- [ ] Confirmation/cancellation emails tested.

## Blog, gallery and recommendations
- [ ] Admin can create/edit/publish blog posts in Norwegian and English.
- [ ] Blog index and individual post pages work from real Sheets data.
- [ ] Admin can upload images to Drive, add alt text, reorder, publish/unpublish and delete gallery items.
- [ ] Upload validation and safe Drive sharing rules tested.
- [ ] Testimonials require permission and explicit publication approval.

## Admin and security
- [ ] Secure server-side admin authentication and session handling implemented.
- [ ] Every admin mutation independently verifies authorization server-side.
- [ ] No secrets/passwords/tokens committed to the public repository or frontend.
- [ ] Session expiry, logout, abuse protections and audit log tested.
- [ ] Unauthorized users cannot mutate data or upload media.

## Newsletter and contact
- [ ] Newsletter records explicit consent, timestamp and language.
- [ ] Double opt-in/unsubscribe and privacy obligations addressed before sending.
- [ ] Kristoffer can manage newsletter content/list as agreed.
- [ ] Contact form submits to real backend, stores messages and has spam protection.
- [ ] Individual-session booking availability, timezone, conflicts and notifications implemented and tested.

## Google stack and launch
- [ ] Google Sheets IDs and Drive folder IDs configured in Apps Script properties, not committed.
- [ ] Apps Script deployment permissions and CORS/fetch behavior tested from production origin.
- [ ] Real data only; no fake workshops or testimonials.
- [ ] Backups and recovery plan confirmed.
- [ ] Test mobile/desktop, both languages, booking capacity edge cases and admin access.
- [ ] Kristoffer approves acceptance test before launch.

## Approved technology constraint
GitHub + Google Apps Script + Google Sheets + Google Drive. Do not introduce Firebase, Cloud Run, or another backend/hosting service unless explicitly approved.

## Status
Initial frontend files are in place. This is not production-ready. Secure admin, booking capacity enforcement, emails, Drive uploads, newsletter workflows, blog editing and complete bilingual content must be implemented and tested before launch.