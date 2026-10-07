# School Countdown

[![Netlify Status](https://api.netlify.com/api/v1/badges/94c3c4e3-11bf-403f-b805-5eeabe6f82ad/deploy-status)](https://app.netlify.com/projects/pausencountdown/deploys)

> Note: The application content is in German.

A simple countdown for school start and break times.

## Features

- Countdown to the next scheduled event
- Fullscreen mode
- Embedded mode for OBS and transparent integrations
- Responsive layout (not always working great)

## Run locally

The app loads `config.json` with `fetch`, so it must be opened through an HTTP
server instead of directly via `file://`.

With VS Code you can use the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension.

## Embedded mode

Append `embedded=true` when embedding the countdown, for example in OBS:

```text
http://pausencountdown.netlify.app/index.html?embedded=true
```

### Effect:

- transparent background
- no fullscreen button

## Configure the schedule

The schedule is loaded from [`config.json`](config.json), so times can be changed without modifying the countdown logic.
Times use the `HH:MM` format;
prefix a target with `next-day:` to reference the following day.

```json
{
  "windowStart": "09:35",
  "windowEnd": "10:00",
  "target": "09:55",
  "label": "Pausenende 09:55"
}
```

`windowStart` and `windowEnd` define when an entry is active. 
`target` is the time being counted down to. 
Keep entries in chronological order without gaps.

## Project structure

```text
.
├── index.html              # HTML entry point
├── config.json             # Schedule and label configuration
├── css/
│   └── style.css           # Layout and styling
└── js/
    ├── config-loader.js    # Loads the configuration
    ├── schedule.js         # Finds the next target
    ├── countdown.js        # Updates the display
    └── fullscreen.js       # Controls fullscreen mode
```
