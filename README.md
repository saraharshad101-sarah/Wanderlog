# Wanderlog

Wanderlog is a travel journal web application built as part of the CodGen Frontend Internship. It helps travelers record trips, photos, destinations, and notes in a simple responsive interface.

## Features

* Responsive travel journal homepage
* Add trips with title, destination, date, and notes
* Form validation
* Trip data persistence using `localStorage`
* Dynamically rendered journey cards
* Edit trips
* Delete trips with confirmation
* Empty-state handling
* Photo upload with live `FileReader` preview
* Trip photos stored as Base64 in `localStorage`
* Trip photos displayed in journey cards
* Public read-only Sarah profile
* Sarah profile includes built-in trips and photos
* Profile URL query parameter, for example `profile.html?user=sarah`
* Invalid profile handling
* Image-load failure handling
* Responsive desktop, tablet, and mobile layouts
* Hover/focus states and interaction feedback
* Basic accessibility improvements

## Tech Stack

* HTML5
* CSS3
* JavaScript
* FileReader API
* `localStorage`
* Google Fonts

## Project Structure

```text
Wanderlog/
├── images/
│   ├── NeelumValley.png
│   └── Saifulmuluk.png
├── index.html
├── profile.html
├── script.js
├── style.css
└── README.md
```

## How to Run Locally

Open the project with a local development server, such as the VS Code Live Server extension, and visit `index.html` in your browser.

The profile page can be accessed using a URL query parameter:

```text
profile.html?user=sarah
```

## Public Profile

The project includes a read-only public profile for Sarah with built-in journey data and photos.

The `user` query parameter determines which profile is displayed. For example, `profile.html?user=sarah` displays Sarah's profile, while an unsupported user displays the invalid-profile state.

## Internship

This project was developed as part of the CodGen Frontend Internship and progressed through four weeks:

* **Week 1:** Foundations & Page Structure
* **Week 2:** Trip CRUD & Dynamic Listing
* **Week 3:** Photo Uploads & Public Profiles
* **Week 4:** Polish & Deployment

## Live Demo

Live URL: https://wanderlog-sarah.netlify.app/

## Repository

GitHub: https://github.com/saraharshad101-sarah/Wanderlog
