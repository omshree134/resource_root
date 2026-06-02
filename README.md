# Resource Root

Resource Root is a lightweight Firebase-hosted web app for browsing MBBS study resources through an interactive year-to-subject graph and opening PDFs in an embedded viewer.

## Features

- Interactive subject tree by MBBS year
- Dedicated subject library view
- Embedded Google Drive PDF viewer
- PWA manifest and app icons
- Firebase Hosting configuration included

## Project Structure

```text
.
|-- index.html
|-- app.js
|-- firebase-config.js
|-- firebase.json
|-- styles.css
|-- viewer.html
|-- public/
|   |-- manifest.webmanifest
|   `-- icons/
`-- README.md
```

## Local Development

Because this app uses ES modules in the browser, serve it with a local web server instead of opening files directly.

Example options:

```powershell
npx serve .
```

or

```powershell
firebase emulators:start --only hosting
```

Then open the local URL printed by the server.

## Deployment

This folder is self-contained and can be used as the repository root for Firebase Hosting.

1. Install the Firebase CLI.
2. Log in with `firebase login`.
3. Associate your own Firebase project with `firebase use --add`.
4. Deploy with `firebase deploy`.

## Notes

- The Firebase Web SDK config in `firebase-config.js` is client-side config, not an admin secret.
- Real security should be enforced with Firebase rules and project settings.
- If you use this folder as the GitHub repo root, keep `.firebaserc` local unless you intentionally want to share a default Firebase project alias.
