import { v4 } from 'uuid';

export default function Button__constructor(params?: {
  text?: string;
  onClick?: (...params: unknown[]) => void;
  DOMID?: string;
}) {
  // Read in the params
  const onClick = params?.onClick || (() => undefined);
  const text = params?.text || '';
  const DOMID = params?.DOMID || v4();

  // Create a button element
  const button = document.createElement('button');
  button.textContent = text; // Add the text to the button

  // Add the ID to our button
  button.id = DOMID;

  // Add click functionality
  button.removeEventListener('mousedown', onClick); // Cleanup just in case
  button.addEventListener('mousedown', onClick); // Add increment to the button

  // Return the button unattached from the DOM
  return button;
}
