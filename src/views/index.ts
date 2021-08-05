import { Counter } from '../components';
import { persist } from '../state';

/** Configuration Levers */

// How much the timer should increment by each click
const COUNTER_STEP = 1;
// The localStorage key to persist the count
const COUNT_LS_ID = 'counter:demo';

// Counter Component Init
const counterRef = Counter({
  DOMID: 'demoCounter',
  defaultValue: readCount(),
  step: COUNTER_STEP,
  effects: [persist(COUNT_LS_ID)],
});

// On window load...
window.addEventListener('load', () => {
  // Render the Counter to the DOM!
  counterRef.render();
  // Log the current count
  console.log('Window loaded! Current count:', counterRef.getCount());
});

/** Reads the count from localStorage */
function readCount(): number | undefined {
  const count = localStorage.getItem(COUNT_LS_ID);
  if (count === null) return undefined;
  else return +count;
}
