export const operations = [
 { label: 'Connect power', section: 'Service windows', status: 'Connecting auxiliary power', restored: 'Restore the confirmed power routing' },
 { label: 'Prime coolant', section: 'Coolant system', status: 'Priming the coolant system', restored: 'Restore the confirmed coolant setting' },
 { label: 'Open cooling loop', section: 'Cooling loop', status: 'Opening the cooling loop', restored: 'Restore the confirmed cooling-loop setting' },
 { label: 'Align containment', section: 'Containment ring', status: 'Aligning the containment ring', restored: 'Restore the confirmed containment alignment' },
 { label: 'Charge the core', section: 'Core windows', status: 'Charging the reactor core', restored: 'Restore the confirmed core setting' },
 { label: 'Stabilise', section: 'Stabilisation crown', status: 'Stabilising the reactor', restored: 'Restore the confirmed stabilisation setting' },
] as const;
export const reactorLessons = [
 { title: 'Find the next action', principle: 'Hierarchy directs attention.', effect: 'A named task and a highlighted control help you identify the next operation. Pulsing adds urgency, but too much motion competes for attention.', source: 'Tidwell, Designing Interfaces (2005), §§3.1, 4.1 and Chapter 5 introduction.' },
 { title: 'Understand the response', principle: 'Feedback makes system state visible.', effect: 'Your command is acknowledged immediately; working status precedes the corresponding reactor lights. Operation progress represents a known 1.5-second simulation.', source: 'Tidwell, Designing Interfaces (2005), §5.2, pattern 49: Progress Indicator.' },
 { title: 'Recover safely', principle: 'Explain what restoration reverses.', effect: 'A fault changes a reactor setting. Restoration reverses that change while retaining confirmed stages. The label can tell you which setting will be restored.', source: 'Tidwell, Designing Interfaces (2005), §1.4 Safe Exploration; §5.2, pattern 51: Multi-Level Undo.' },
];
