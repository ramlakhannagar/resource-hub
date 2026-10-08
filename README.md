# Developer Resource Hub

A simple website to find, search and share developer tools, sites and tutorials. Built for the GDG on Campus AITR Web Developer Recruitment 2026 (Task 3).

**Live demo:** (link will be added after deployment)

## Features

- Resource cards showing title, category, description and a link
- Live search by title, description or category, with no page refresh
- Category filter that works together with the search
- Form to add a new resource, with checks for empty fields and invalid links
- Saved data: resources and votes stay after refreshing the page
- Upvote button on every card
- Dark and light mode toggle that remembers your choice
- Works on mobile and desktop screens

## Tech stack

- HTML for the page structure
- CSS for the design, including CSS variables for dark mode
- JavaScript for the logic (no frameworks or libraries)
- Browser localStorage for saving data

## How to run it

1. Download or clone this repository.
2. Open the file index.html in any web browser.

No installation is needed.

## Project structure

- index.html: the page layout, the form, the search box and the filter
- style.css: all colors, layout and dark mode styles
- script.js: the resource list, search, filter, add form, upvotes, saving and theme toggle

## How it works

- Resources are stored as a list of objects (title, category, description, link, votes).
- One function draws a card for every resource in the list it receives.
- Search and filter check the text and the category together, then draw the matching cards again.
- The list is saved in localStorage as JSON and loaded when the page opens.
- Text typed by users is escaped before it is shown, so it cannot run as code.

## Limitations and future ideas

- Data is saved only in the browser on one device. A backend database would let everyone share the same resources.
- Upvotes are not limited per person. Saving which resources a user already voted for would prevent repeat votes.

## Author

Ram