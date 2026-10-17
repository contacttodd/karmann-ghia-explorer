/* Karmann Ghia Learning App - Data Catalog
   Easy to extend: add new systems and parts here.
   Each part can have: name, description, howItWorks, commonIssues, torque, notes
*/

const SYSTEMS = {
  engine: {
    id: 'engine',
    name: 'Air-Cooled Flat-4 Engine',
    short: 'Engine',
    color: 0xc45c26,
    description: 'The heart of your 1972 Karmann Ghia — a rear-mounted, air-cooled flat-four (typically 1600cc dual-port). Simple, reliable, and shared with the Beetle.',
    howItWorks: 'Pistons move in opposing pairs (boxer configuration). Air is drawn in, mixed with fuel at the carburetor, compressed, ignited, and exhausted. Cooling is provided by a belt-driven fan blowing air over the finned cylinders and heads.',
    commonIssues: [
      'Oil leaks from pushrod tubes and valve covers',
      'Clogged cooling fins or missing tinware → overheating',
      'Carburetor problems (idle stall when warm, rich/lean)',
      'Worn valve guides or improper valve adjustment',
      'Timing issues or weak points/condenser'
    ],
    parts: [
      { id: 'crank', name: 'Crankshaft', desc: 'Converts piston motion to rotary power.' },
      { id: 'pistons', name: 'Pistons & Cylinders', desc: 'Four cylinders in opposing pairs. Finned for air cooling.' },
      { id: 'heads', name: 'Cylinder Heads', desc: 'Contain valves, rockers, and cooling fins.' },
      { id: 'fan', name: 'Cooling Fan', desc: 'Belt-driven fan in the fan housing. Critical for cooling.' },
      { id: 'carb', name: 'Carburetor (Solex 34 PICT-3 typical)', desc: 'Mixes air and fuel. Choke for cold starts.' }
    ]
  },
  suspension: {
    id: 'suspension',
    name: 'Suspension & Steering',
    short: 'Suspension',
    color: 0x4a6fa5,
    description: '1972 models use ball-joint front suspension and IRS (independent rear suspension) on most cars. Widened Beetle pan underneath the Ghia body.',
    howItWorks: 'Front: torsion bars with ball joints control wheel movement. Rear: IRS with CV joints allows independent wheel travel. Steering is worm-and-roller or similar, connected via tie rods.',
    commonIssues: [
      'Worn ball joints or king pins (earlier cars)',
      'Sagging torsion bars',
      'CV joint boot tears → grease loss and wear',
      'Play in steering box or tie rods',
      'Shock absorbers worn (bouncy ride)'
    ],
    parts: [
      { id: 'front', name: 'Front Suspension', desc: 'Ball-joint style on 1968+ Type 1.' },
      { id: 'rear', name: 'Rear IRS', desc: 'Independent rear suspension with CV joints.' },
      { id: 'steering', name: 'Steering Box & Linkage', desc: 'Worm and roller steering.' }
    ]
  },
  electrical: {
    id: 'electrical',
    name: 'Electrical System',
    short: 'Electrical',
    color: 0xf0c040,
    description: '12-volt system (1967+). Generator or alternator, voltage regulator, ignition, lighting, and gauges.',
    howItWorks: 'Battery supplies power. Generator/alternator charges the battery via the voltage regulator. Ignition system (points, coil, distributor) fires the plugs. Fuses protect circuits.',
    commonIssues: [
      'Failing voltage regulator (dim/flickering lights, battery issues)',
      'Worn points and condenser',
      'Corroded connections or bad grounds',
      'Generator/alternator brush wear',
      'Fuse problems'
    ],
    parts: [
      { id: 'battery', name: 'Battery', desc: '12V battery under the rear seat or in trunk area depending on setup.' },
      { id: 'regulator', name: 'Voltage Regulator', desc: 'Controls charging. Common failure point.' },
      { id: 'distributor', name: 'Distributor', desc: 'Points, condenser, rotor, and cap. Timing is critical.' },
      { id: 'coil', name: 'Ignition Coil', desc: 'Steps up voltage for the spark plugs.' }
    ]
  },
  brakes: {
    id: 'brakes',
    name: 'Brakes & Master Cylinder',
    short: 'Brakes',
    color: 0xb83232,
    description: 'Your 1972 Ghia uses a dual-circuit hydraulic system. The master cylinder is the heart of it — it converts pedal force into hydraulic pressure that reaches the front discs and rear drums.',
    howItWorks: 'When you press the brake pedal, a pushrod moves two pistons inside the master cylinder. These pistons force brake fluid out through separate circuits: one circuit serves the front brakes, the other serves the rear. Because the circuits are independent, a leak in one still leaves you with braking power on the other. Fluid is incompressible, so the pressure is transmitted almost instantly to the calipers and wheel cylinders.',
    commonIssues: [
      'Soft or spongy pedal (air in the lines or worn internal seals)',
      'Pedal sinks slowly (internal bypass leak in the master cylinder)',
      'Leaking at the reservoir grommets or outlet ports',
      'Incorrect pushrod free-play (should be ~1 mm / 5–7 mm pedal movement before engagement)',
      'Contaminated or low fluid in the dual reservoir'
    ],
    parts: [
      { id: 'master', name: 'Dual-Circuit Master Cylinder', desc: 'Two separate chambers (front & rear). Typical bore ~19–20.6 mm on later Type 1. Mounted on the firewall under the front trunk area. Has outlet ports for front left, front right, and rear circuit plus brake-light switches.' },
      { id: 'reservoir', name: 'Brake Fluid Reservoir', desc: 'Translucent dual-port plastic reservoir that sits on top of (or is remote-mounted to) the master cylinder. Keeps both circuits fed. Check level regularly — fluid is hygroscopic and should be changed periodically.' },
      { id: 'front-discs', name: 'Front Discs & Calipers', desc: 'Common on 1967+ Ghias. Larger fluid volume demand than drums.' },
      { id: 'rear-drums', name: 'Rear Drums', desc: 'Wheel cylinders expand the shoes against the drums.' }
    ]
  },
  cooling: {
    id: 'cooling',
    name: 'Cooling & Tinware',
    short: 'Cooling',
    color: 0x5cb85c,
    description: 'No liquid coolant. The engine is cooled by forced air from the fan, directed by tinware (sheet metal shrouds).',
    howItWorks: 'The fan pulls air through the fan housing and forces it over the cylinders and heads. Tinware seals the air path so air goes where it is needed. Missing or damaged tinware causes hot spots.',
    commonIssues: [
      'Missing or bent tinware → overheating',
      'Clogged fins with dirt/oil',
      'Fan belt issues',
      'Thermostat flaps stuck (if equipped)'
    ],
    parts: [
      { id: 'tinware', name: 'Tinware / Shrouds', desc: 'Directs cooling air. Critical — never run without it.' },
      { id: 'fanbelt', name: 'Fan Belt', desc: 'Drives the cooling fan and generator/alternator.' }
    ]
  }
};

const TROUBLESHOOTING = [
  {
    id: 'warm-stall',
    title: 'Stalls or rough idle when warm',
    symptoms: 'Runs fine cold, dies or idles poorly once warmed up.',
    steps: [
      'Check choke — it should open fully when warm.',
      'Adjust idle mixture and speed on the carburetor.',
      'Look for vacuum leaks (hoses, carb base, intake).',
      'Check idle cut-off solenoid (if equipped) and its wiring.',
      'Verify ignition timing and point gap.'
    ],
    related: ['engine', 'electrical']
  },
  {
    id: 'oil-leak',
    title: 'Oil leak under rear',
    symptoms: 'Oil spots on the ground behind the car or on the engine.',
    steps: [
      'Inspect pushrod tubes — common leak point. Replace O-rings.',
      'Check valve cover gaskets.',
      'Look at the oil cooler seals.',
      'Check rear main seal area and flywheel seal.',
      'Clean thoroughly and recheck after a short run to pinpoint.'
    ],
    related: ['engine']
  },
  {
    id: 'charging',
    title: 'Battery dies or lights dim/flicker',
    symptoms: 'Lights pulse, battery goes dead, or charging light stays on.',
    steps: [
      'Test voltage at battery with engine running (should be ~13.5–14.5V).',
      'Inspect and clean all charging system connections.',
      'Check/replace voltage regulator.',
      'Inspect generator/alternator brushes and belt tension.',
      'Verify good grounds.'
    ],
    related: ['electrical']
  },
  {
    id: 'overheat',
    title: 'Engine overheating',
    symptoms: 'Loss of power, pinging, or oil smell after hard driving.',
    steps: [
      'Verify all tinware is present and properly sealed.',
      'Clean cooling fins of dirt and oil.',
      'Check fan belt tension and condition.',
      'Confirm fan is spinning and not damaged.',
      'Check for restricted exhaust or rich mixture.'
    ],
    related: ['cooling', 'engine']
  }
];

// Personal notes storage key
const NOTES_KEY = 'ghia-notes';
