import { useCounter } from './scripts';
import { IStateEffectParams, useState__logger } from './state';
import { $ } from './utils';

function Count__constructor({ DOMID: Count__DOM_ID }: { DOMID: string }) {
  // Initialize a counter state object
  const { getCount, increment } = useCounter({
    // We need to manually tie in the render effect since we don't have context
    effects: [Count__render, useState__logger('count')],
  });
  // Render the count state to the DOM
  function Count__render(state?: IStateEffectParams<number>) {
    // Add increment function to the mousedown for the button
    const button = $('#trigger');
    button.removeEventListener('mousedown', increment);
    button.addEventListener('mousedown', increment);

    // Update the bucket content
    const bucket = $(Count__DOM_ID);
    if (bucket) {
      bucket.innerHTML = `${state?.next ?? getCount()}`;
    }
  }

  return {
    render: Count__render,
  };
}

const Count = Count__constructor({ DOMID: '#displayCount' });

// On window load...
window.addEventListener('load', () => {
  // Render the count to the DOM on page load
  Count.render();
});
