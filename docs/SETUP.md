# Setup guide

## 1. Create Google Sheets database
Create a new Google Spreadsheet owned by the site operator. Open Extensions → Apps Script and add `apps-script/Code.gs` contents to the script project. Set Script Property `SPREADSHEET_ID` to the spreadsheet ID. Run `setupSheetStructure` manually and approve the requested Google permissions.

## 2. Deploy Apps Script
Deploy → New deployment → Web app. Select the appropriate execution identity and access level only after reviewing the security model. Copy the deployed URL into a local `config.js` based on `config.example.js`. Do not commit `config.js` if it contains environment-specific values.

## 3. Important security and launch warning
The current backend is a starter only. It does not yet implement secure admin authentication, admin write endpoints, capacity locking, booking confirmations, Drive uploads, or newsletter subscription/unsubscribe. Do not collect live reservations or expose admin functions until these are built and tested. For the public site, use only real approved content.

## 4. Hosting
Use GitHub Pages or the agreed hosting arrangement for static files. The backend remains Google Apps Script, structured records remain in Sheets, and images are stored in Drive. Do not add Firebase or Cloud Run without explicit approval.