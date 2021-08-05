import {
  ICounterParams,
  IStateEffectParams,
  logger,
  useCounter,
} from '../../../state';
import { $ } from '../../../utils';
import { Button } from '../../atoms';

export default function Counter__constructor({
  DOMID,
  ...counterParams
}: ICounterParams & {
  DOMID: string;
}) {
  // Initialize a counter state object
  const { getCount, increment, step } = useCounter({
    /**
     * Here, passing in the render function as an effect allows us
     * to rerender the component
     */
    effects: [Count__render, logger('count')],
    ...counterParams,
  });

  const buttonText = `Add ${step}!`;

  // Declare IDs for child elements
  const buttonId = `${DOMID}__incrementButton`;
  const spanId = `${DOMID}__textCount`;

  // Render the count state to the DOM
  function Count__render(state?: IStateEffectParams<number>) {
    // Put our current count in a new span element
    const countText = document.createElement('span');
    const currentCount = state?.next ?? getCount();
    countText.textContent = `${currentCount}`;
    countText.id = spanId;

    // Create a button element that increments our counter
    const incrementButton = Button({
      onClick: increment,
      text: buttonText,
      DOMID: buttonId,
    });

    // Make sure we have a container
    const container = $(`#${DOMID}`);
    if (!container) {
      throw new Error('Invalid DOMID parameter passed in: ' + DOMID);
    }

    if (container.hasChildNodes()) {
      // Replace old elements
      const oldSpan = $(`#${spanId}`);
      container.replaceChild(countText, oldSpan);
      const oldButton = $(`#${buttonId}`);
      container.replaceChild(incrementButton, oldButton);
    } else {
      // The first time, don't replace - add!
      container.append(
        countText,
        document.createElement('br'),
        incrementButton,
      );
    }

    // Expose the container node
    return container;
  }

  // Return the render function so that we can render on page load!
  return {
    render: Count__render,
    increment,
    getCount,
  };
}
