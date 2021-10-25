import { render, screen } from '@testing-library/react';
import ToDoApp from './ToDoApp';

test('renders learn react link', () => {
  render(<ToDoApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
