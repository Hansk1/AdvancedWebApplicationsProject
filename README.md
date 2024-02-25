# Simple tinder clone

## Description

This web application is a basic replica of the well-known dating platform Tinder. Users can view profiles of other users and indicate their interest by either liking or disliking them. When two users like each other's profiles, a match is formed, allowing them to start chatting.

## Table of Contents

-   [Installation](#Installation)
-   [Responsiveness](#Responsiveness)
-   [Technologies](#Technologies)
-   [Features](#Features)
-   [Bugs](#Bugs)

## Installation

To run this application locally, follow these steps:

### Prerequisites

Make sure you have the following installed on your local machine:

-   Node.js (including npm)
-   MongoDB server (Running)
-   npx and nodemon

Notes:

-   The client runs on port 3000
-   The server runs on port 5000
-   To run the tests use (npx cypress run)

### Clone the Repository

```bash
git clone https://github.com/Hansk1/AdvancedWebApplicationsProject
cd <project root folder>
```

### Instal required node modules

```bash
npm run install-modules
```

### Run the app

```bash
npm run dev
```

### Responsiveness

The responsiveness of the application has been tested on a 430px screen.

### Technologies

-   MongoDB
-   Express
-   React (Material UI)
-   NodeJS
-   Cypress

### Features

| Feature                                           | Points |
| ------------------------------------------------- | ------ |
| Basic features                                    | 25     |
| React                                             | 5      |
| Swiping                                           | 2      |
| Profile Pictures                                  | 3      |
| Timestamps                                        | 2      |
| Unit testing (Automated)                          | 5      |
| Using hTTP cookies to save userData and JWT token | 2-3    |
| Total                                             | 44-45  |

The use of HTTP cookies was not taught in the course, so I thought I could get a couple of points for using them. With the help of cookies, the user remains logged in to the page even if the page is reloaded.

### Bugs

-   When adding a profile picture, the user needs to press the button two times
