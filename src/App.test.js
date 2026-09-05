import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the Ceylonix.CMB brand name in the navigation', () => {
  render(<App />);
  const brandElements = screen.getAllByText(/Ceylonix/i);
  expect(brandElements.length).toBeGreaterThan(0);
});
