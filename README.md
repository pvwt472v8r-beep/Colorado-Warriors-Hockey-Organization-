# Colorado-Warriors-Hockey-Organization-
New Redesign for the Colorado Warriors

## Contact form

The Get Involved form uses FormSubmit's standard POST flow, reCAPTCHA and
automatic response. Playing and Something else go to Stephan with Hockey
Operations copied; Volunteering goes to Business Operations; Sponsoring and
Donating go to Fundraising. The routing is configured in `contact-form.js`.

Before launch, submit a test for each of the three primary recipient addresses
from the deployed site and have each recipient activate the form using the
FormSubmit activation email. Then test all five choices with a real email address:
confirm each recipient (including Hockey Operations for Playing and Something
else) receives the right message, and the sender receives the automatic reply.
Complete any verification prompted by FormSubmit. Check spam folders if needed.
The form needs JavaScript to route messages; without it, visitors can use the
email link on the page.

## Adding gallery photos

In `photos.html`, add a `figure` inside `.gallery` with the appropriate
`data-category` (`on-the-ice`, `community`, `tournaments`, or `locker-room`). Follow the
existing on-ice photos: wrap an `img` in
an `<a class="gallery-photo">` linking to the full-size image, and add a
descriptive `alt` and accessible link label. Captions are not displayed;
the viewer groups photos by category, even when the All filter is selected.

## Adding shop logos

Save each logo in the `image` folder. In `support.html`, find the matching
`shop-logo-placeholder` and replace its `<div>` with an image, for example:

```html
<img class="shop-logo" src="image/squadlocker-logo.png" alt="SquadLocker">
```

Use the actual file name and a suitable alt text for each store.

## Updating season events

Edit the events in `support.html` inside `#season-events`, in the intended
display order. Each event's `data-end` uses `YYYY-MM-DD`; it is the last day
the event should appear in "Coming up next" (use the end of the month or date
range for an undated event). The first three events whose end dates have not
passed in Colorado are displayed automatically. The complete season stays
available under "View full season". Update or remove tentative events as
details are confirmed, and replace the season list when the calendar changes.
