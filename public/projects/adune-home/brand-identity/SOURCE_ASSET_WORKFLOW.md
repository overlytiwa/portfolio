# Using original ADUNÉ imagery (rather than mockups)

The design source is **https://adunehome.com/**. The original website is the only allowed download source for the image-sync script. Do not replace missing original product photos with stock images, pretend images were downloaded when they were not, or misidentify the previous ADUNÉ rebrand mark as the official logo.

The connected execution environment blocked access to the site's binary media files. To complete the source-asset library, from a computer with ordinary network access:

1. `cd react-website`
2. `npm install`
3. `npm run sync:assets`
4. `npm run dev`

The sync command checks the official homepage and the real product pages, downloads original media into `react-website/public/assets/original/`, and copies them to `brand-identity/official-source-assets/`. The `source-manifest.json` documents every downloaded URL and saves no third-party imagery. `react-website/public/assets/original/manifest.js` maps product and hero slots to those files. The site will use these originals automatically.

Open `brand-identity/brand-applications.html` after asset sync. The social, product labels and editorial brand applications will use precisely these downloaded product images and the original logo if found. Missing assets are left visibly blank. Then upload the selected original files from `official-source-assets` to editable image slots in the Figma file linked below.

**Figma:** 

**Note:** An unofficial rebrand should only publish the original photography/logo with appropriate rights or the brand's permission.
