import { render, screen } from '@testing-library/react';
import App from './App';

test('renders top headlines heading', () => {
  render(<App />);
  const heading = screen.getByText(/Top headlines for you/i);
  expect(heading).toBeInTheDocument();
});
