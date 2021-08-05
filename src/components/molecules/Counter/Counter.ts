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
  effects,
  ...counterParams
}: ICounterParams & {
  DOMID: string;
}) {
  // Initialize a counter state object
  const { getCount, increment, reset, step, initialValue } = useCounter({
    /**
     * Here, passing in the render function as an effect allows us
     * to rerender the component
     */
    effects: [...effects, Count__render, logger('count')],
    ...counterParams,
  });

  /** Some variables don't need to recalculate every render... */

  // Increment Button Props
  const incBtnText = `Add ${step}!`;
  const incBtnId = `${DOMID}__incrementButton`;
  // Reset Button Props
  const rstBtnText = `Reset to ${initialValue}`;
  const rstBtnId = `${DOMID}__resetButton`;
  // Count Span Props
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
      text: incBtnText,
      DOMID: incBtnId,
    });

    // Create a button element that resets our counter
    const resetButton = Button({
      onClick: reset,
      text: rstBtnText,
      DOMID: rstBtnId,
    });

    // Make sure we have a container
    const container = $(`#${DOMID}`);
    if (!container) {
      throw new Error('Invalid DOMID parameter passed in: ' + DOMID);
    }

    if (container.hasChildNodes()) {
      // Replace old count, buttons can stay!
      const oldSpan = $(`#${spanId}`);
      container.replaceChild(countText, oldSpan);
      // const oldIncBtn = $(`#${incBtnId}`);
      // container.replaceChild(incrementButton, oldIncBtn);
      // const oldRstBtn = $(`#${rstBtnId}`);
      // container.replaceChild(resetButton, oldRstBtn);
    } else {
      // The first time, don't replace - add!
      container.append(
        countText,
        document.createElement('br'),
        incrementButton,
        resetButton,
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
