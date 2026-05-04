# NYC Restaurant Explorer

A React + Mapbox web app for exploring New York City restaurant inspection data from NYC Open Data.

The app:
- fetches restaurant inspection records from the NYC Open Data API
- shows restaurants on an interactive map
- lets you filter by borough, cuisine, grade, and minimum inspection score
- shows a detail panel when you click a restaurant marker

## How to Run the Project

### 1. Install dependencies

```bash
npm install
```

### 2. Add your Mapbox token

Create a `.env` file in the project root and add:

```bash
REACT_APP_MAPBOX_TOKEN=your_mapbox_access_token_here
```

This project reads the token from `src/config.js`, so the `REACT_APP_MAPBOX_TOKEN` environment variable must be set before starting the app.

### 3. Start the development server

```bash
npm start
```

Then open:

```text
http://localhost:3000
```

### 4. Create a production build

```bash
npm run build
```


## Dependencies

Main runtime dependencies from `package.json`:

- `react` `^19.2.5`
- `react-dom` `^19.2.5`
- `react-scripts` `5.0.1`
- `axios` `^1.16.0`
- `mapbox-gl` `^3.23.0`
- `web-vitals` `^2.1.4`

Testing dependencies:

- `@testing-library/react` `^16.3.2`
- `@testing-library/jest-dom` `^6.9.1`
- `@testing-library/dom` `^10.4.1`
- `@testing-library/user-event` `^13.5.0`

## Example Usage

1. Start the app with `npm start`.
2. The map loads with `Manhattan` selected by default in the borough filters.
3. Click one or more borough pills such as `Brooklyn` or `Queens` to expand the results.
4. Choose a cuisine from the dropdown, such as `Italian`.
5. Optionally filter by inspection grade like `A` or `B`.
6. Enter a minimum inspection score to narrow the dataset further.
7. Click a restaurant marker on the map to open its detail panel.
8. Review the restaurant’s address, phone, cuisine, inspection date, score, and related inspection details.

## Project Structure

```text
src/
  App.js
  App.css
  config.js
  components/
    Filters.js
    MapView.js
    RestaurantPanel.js
```

## Data Source

NYC Open Data restaurant inspection dataset:

- `https://data.cityofnewyork.us/Health/DOHMH-New-York-City-Restaurant-Inspection-Results/43nn-pn8j/about_data`
