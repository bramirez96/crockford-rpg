import { Counter } from './components';

// Initialize an instance of the Counter component to render to our HTML
const counterRef = Counter({ DOMID: 'demoCounter' });

// On window load...
window.addEventListener('load', () => {
  // Render the Counter to the DOM!
  counterRef.render();

  console.log('Window loaded! Current count:', counterRef.getCount());
});
