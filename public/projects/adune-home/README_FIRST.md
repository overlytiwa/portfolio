# ADUNÉ HOME — REVISED REBRAND DELIVERY

**Editable Figma (desktop/mobile/brand foundation)**


**Website:** `react-website/` contains the React source (Vite), routes, navigation, product browsing, responsive styling and mobile presentation. Repetitive uppercase eyebrow labels are visually removed. `react-website/standalone-preview/` contains a portable React preview.

**Official images and logo:** The project has been changed to accept ORIGINAL Aduné assets, never randomly substituted stock. However **the original website images and logo could not be downloaded in this session because DNS/network access to adunehome.com was blocked in the working environment**. Consequently these assets are NOT included, and Figma currently retains labeled image placeholders. Run the included synchronizer from a computer with internet access:

    cd react-website
    npm install
    npm run sync:assets
    npm run dev

The script fetches original assets from https://adunehome.com, validates the image bytes, and places them in `public/assets/original/`, simultaneously copying to `brand-identity/official-source-assets/`. It writes a provenance manifest. The website and `brand-identity/brand-applications.html` pick up those photos and the original logo from this manifest.

**Branding:** `brand-identity/brand-applications.html` is the new original-image-first identity presentation. `brand-identity/previous-proposed-identity/` contains the earlier logo proposals, social artwork, packaging templates, research, patterns, and proposed brand book. They are preserved to review and edit, but are *not* official brand assets.

**Status:** This is an unofficial rebrand concept; not an operational store or an authenticated brand asset export. No Vercel deployment was performed. Product names are from the brand's official site; live inventory/pricing/checkout are not connected.
