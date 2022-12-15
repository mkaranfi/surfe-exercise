# Surfe Frontend Challenge

This is a solution for the frontend challenge @Surfe.

The requirements are documented [here](https://work.surfe.com/front-end-engineer-typescript-react/front-end-coding-challenge).

## Run the app

#### Install dependencies

In the project directory run:

#### `$ yarn install`
or just
#### `$ yarn`

#### Start app

In the project directory run:

#### `$ yarn start`

This will run the app in local development mode.
Open http://localhost:3000 to view it in the browser.

## Libraries & Tools

- React 18
- TypeScript 4
- SASS
- Lodash
- Camelcase Keys
- Prettier

## Project Structure

```
- src
  - api
    - notes-api-client.ts
  - assets
    - fonts
    - icons
  - components
    - notes
      - Note.tsx
      - Note.style.scss
    - ui-controls
      - text-area
        - TextArea.tsx
  - hooks
    - useMostMentionedUsers.ts
  - types
    - Note.ts
  - utilities
    - enums.ts
```

Project directories have been defined and grouped by file type.
- `api` is the place to store all API-related requests and functions.
- `assets` is the place to store static assets (like images, SVG icons, fonts, etc.).
- `components` is the place to create App components. They are further divided by feature named directories (like `notes`).
  Both presentational and container components can be placed together in this directory
  since most of the time it's hard to distinguish between the two.

  It also contains `ui-controls` a place intended to contain simple, generic, reusable React wrappers to native HTML elements. 
- `hooks` is the place to store custom React Hooks.
- `types` is the place to define models and type interfaces.
- `utilities` is the place to store all kinds of different utilities, helpers, enums, etc.

# Features

- New notes can be added by clicking anywhere inside the lightblue container
- The text inside the notes is automatically saved. When the app is reopened the notes and text that was last saved will be reloaded.
- Notes can be "soft" deleted by hovering over a note and clicking on the Bin/Trash icon. 
- Usernames can be mentioned by starting to type with '@'. A list of suggested usernames will appear on the right side of the note.
A username can then be selected from that list and added to the note.
- On the top-right side inside the container is a list of most mentioned users. These users can be dragged & dropped to any note.

#### Limitations, constraints, and additional notes
- Updating the note is done by calling the API endpoint with a 500ms timeout. This is done to prevent the API being called on each typed key by the user
  which will result in too many requests.
- The API doesn't offer an endpoint to DELETE a note (as far as I know),
  instead when deleting a note the note itself is only marked as deleted and this is stored in the browser data.
- The requirement for user mentions wasn't fully implement like it was requested. If you start typing with '@' and if anything typed after that breaks any match
with the list of all users you'll have to start again with '@' to see the list of suggested users.
- The requirement to have the user appear with a special style in the note was not implemented, due to being out of development time 🥲.
  For a better user experience, the list of suggested usernames should appear below the typed '@' but it was also not implemented this way due to time constraints.
- A limitation with dragging & dropping user mentions is that the usernames can only be appended at the end of the text inside the note (not at start or somewhere in between).

## Demos

#### Showcasing: Note creation and save/load on refresh
[![showcase 1](demos/thumbnail.jpeg)](demos/showcase1.mov)

#### Showcasing: Updating a note and Deleting a note
[![showcase 2](demos/thumbnail.jpeg)](demos/showcase2.mov)

#### Showcasing: Displaying and selecting user mentions and Dragging & dropping user mentions
[![showcase 3](demos/thumbnail.jpeg)](demos/showcase3.mov)

## Leftovers, Tech Debt, and TODOs

- Missing unit tests and testing framework setup
- `Note.tsx` ended up with a lot of responsibilities, it should be reworked so that some of the responsibilities are delegated to a different component or a hook
- Implement special style for user mentions inside inside the note
- Make suggested users dropdown appear below '@'
- Enable suggested users to always appear whenever you have an active '@' inside the note. This means to keep the list while typing, moving the cursor, deleting/using Backspace key, etc.
- Enable dragging & dropping users anywhere inside the note (instead of just at the end)
- Move colors used in SCSS files to a single file (either `colors.style.scss`  or `theme.style.scss`) and `@use` them to replace the hardcoded values
- Define a blueprint for API Http requests. A lot of the Fetch requests have repeating/similar code parts. 

## Resources
- [Challenge requirements](https://work.surfe.com/front-end-engineer-typescript-react/front-end-coding-challenge)
