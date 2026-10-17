# Karmann Ghia Explorer

A mobile-friendly web app to learn about your 1972 Karmann Ghia (Type 14).

## Features
- Interactive 3D view of the car with system overlays
- Engine animation (piston motion + cooling fan)
- Detailed info panels for Engine, Suspension, Electrical, Brakes, and Cooling
- Troubleshooting guides for common issues
- Personal notes (saved locally in your browser)

## How to use
1. Open `index.html` in any modern browser (Chrome, Safari, Firefox).
2. On your phone: drag to orbit, pinch to zoom, tap the system buttons at the bottom.
3. Tap **Notes** to add your own observations — they stay on that device.

## Extending it
All content lives in `data.js`. To add a new system or more detail:

1. Add a new entry to the `SYSTEMS` object.
2. Optionally add a corresponding visual group in `app.js` inside `buildSystems()`.
3. Add troubleshooting entries to the `TROUBLESHOOTING` array.

Example of adding a part to an existing system:
```js
// Inside SYSTEMS.engine.parts
{ id: 'oil-cooler', name: 'Oil Cooler', desc: 'Mounted in the fan housing. Common leak point at the seals.' }
```

## Next steps you can take
- Replace the stylized geometry with a real GLB model of a Karmann Ghia (load via GLTFLoader).
- Add more detailed animations or exploded views.
- Connect live data from the Raspberry Pi in the car.
- Extract text from a service manual and expand the troubleshooting database.

## Files
- `index.html` — main page
- `style.css` — mobile-first styling
- `data.js` — all the content (easy to edit)
- `app.js` — Three.js scene and interactions
