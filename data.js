/* Karmann Ghia Learning App - Data Catalog
   Easy to extend: add new systems and parts here.
*/

const AREAS = {
  front: {
    name: 'Front',
    parts: [
      { id: 'brakes', name: 'Master Cylinder' },
      { id: 'suspension', name: 'Front Suspension' },
      { id: 'electrical', name: 'Battery / Front Electrical' }
    ]
  },
  rear: {
    name: 'Rear / Engine',
    parts: [
      { id: 'engine', name: 'Engine (Flat-4)' },
      { id: 'cooling', name: 'Cooling & Tinware' },
      { id: 'suspension', name: 'Rear Suspension' }
    ]
  },
  interior: {
    name: 'Interior',
    parts: [
      { id: 'brakes', name: 'Brake Pedal & Pushrod' },
      { id: 'electrical', name: 'Dashboard & Switches' }
    ]
  },
  brakes: {
    name: 'Brakes (system)',
    parts: [
      { id: 'brakes', name: 'Full Brake System' }
    ]
  },
  electrical: {
    name: 'Electrical (system)',
    parts: [
      { id: 'electrical', name: 'Charging & Ignition' }
    ]
  }
};

const SYSTEMS = {
  engine: {
    id: 'engine',
    name: 'Air-Cooled Flat-4 Engine',
    short: 'Engine',
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
    description: '1972 models use ball-joint front suspension and IRS (independent rear suspension) on most cars.',
    howItWorks: 'Front: torsion bars with ball joints control wheel movement. Rear: IRS with CV joints allows independent wheel travel.',
    commonIssues: [
      'Worn ball joints',
      'Sagging torsion bars',
      'CV joint boot tears',
      'Play in steering box or tie rods',
      'Shock absorbers worn'
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
    description: '12-volt system (1967+). Generator or alternator, voltage regulator, ignition, lighting, and gauges.',
    howItWorks: 'Battery supplies power. Generator/alternator charges the battery via the voltage regulator. Ignition system (points, coil, distributor) fires the plugs.',
    commonIssues: [
      'Failing voltage regulator',
      'Worn points and condenser',
      'Corroded connections or bad grounds',
      'Generator/alternator brush wear'
    ],
    parts: [
      { id: 'battery', name: 'Battery', desc: '12V battery.' },
      { id: 'regulator', name: 'Voltage Regulator', desc: 'Controls charging. Common failure point.' },
      { id: 'distributor', name: 'Distributor', desc: 'Points, condenser, rotor, and cap.' },
      { id: 'coil', name: 'Ignition Coil', desc: 'Steps up voltage for the spark plugs.' }
    ]
  },
  brakes: {
    id: 'brakes',
    name: 'Brakes & Master Cylinder',
    short: 'Brakes',
    description: 'Your 1972 Ghia uses a dual-circuit hydraulic system. The master cylinder converts pedal force into hydraulic pressure that reaches the front discs and rear drums.',
    howItWorks: 'When you press the brake pedal, a pushrod moves two pistons inside the master cylinder. These pistons force brake fluid out through separate circuits: one for the front brakes, one for the rear. A leak in one circuit still leaves you with braking on the other.',
    commonIssues: [
      'Soft or spongy pedal (air in the lines or worn seals)',
      'Pedal sinks slowly (internal bypass leak)',
      'Leaking at the reservoir grommets or outlet ports',
      'Incorrect pushrod free-play (~1 mm)',
      'Contaminated or low fluid'
    ],
    parts: [
      { id: 'master', name: 'Dual-Circuit Master Cylinder', desc: 'Two separate chambers (front & rear). Mounted on the firewall. Outlet ports for front left, front right, and rear circuit plus brake-light switches.' },
      { id: 'reservoir', name: 'Brake Fluid Reservoir', desc: 'Translucent dual-port plastic reservoir. Check level regularly.' },
      { id: 'front-discs', name: 'Front Discs & Calipers', desc: 'Common on 1967+ Ghias.' },
      { id: 'rear-drums', name: 'Rear Drums', desc: 'Wheel cylinders expand the shoes against the drums.' }
    ]
  },
  cooling: {
    id: 'cooling',
    name: 'Cooling & Tinware',
    short: 'Cooling',
    description: 'No liquid coolant. The engine is cooled by forced air from the fan, directed by tinware.',
    howItWorks: 'The fan pulls air through the fan housing and forces it over the cylinders and heads. Tinware seals the air path so air goes where it is needed.',
    commonIssues: [
      'Missing or bent tinware → overheating',
      'Clogged fins with dirt/oil',
      'Fan belt issues'
    ],
    parts: [
      { id: 'tinware', name: 'Tinware / Shrouds', desc: 'Directs cooling air. Critical — never run without it.' },
      { id: 'fanbelt', name: 'Fan Belt', desc: 'Drives the cooling fan and generator/alternator.' }
    ]
  }
};

const NOTES_KEY = 'ghia-notes';
