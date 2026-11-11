# Colorado-Warriors-Hockey-Organization-
New Redesign for the Colorado Warriors

## Adding gallery photos

In `photos.html`, add a `figure` inside `.gallery` with the appropriate
`data-category` (`locker-room`, `on-the-ice`, `community-outreach`, or
`national-tournaments`). Follow the existing on-ice photos: wrap an `img` in
an `<a class="gallery-photo">` linking to the full-size image, and add a
descriptive `alt`, accessible link label, and `figcaption`. The viewer groups
photos by category, even when the All filter is selected. Placeholder tiles
are not included in the viewer.

## Adding shop logos

Save each logo in the `image` folder. In `support.html`, find the matching
`shop-logo-placeholder` and replace its `<div>` with an image, for example:

```html
<img class="shop-logo" src="image/squadlocker-logo.png" alt="SquadLocker">
```

Use the actual file name and a suitable alt text for each store.
