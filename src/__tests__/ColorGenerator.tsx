import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import ColorGenerator from '../components/ColorGenerator';

test('renders generate button', async () => {
	await act(() => {
		render(<ColorGenerator />);
	});
  
  await waitFor(() => {
	  const generateButton = screen.getByText(/Generate/i);
	  expect(generateButton).toBeInTheDocument();
	});
});

test('renders color cards', async () => {
	const {container} = render(<ColorGenerator />);

	const card = container.querySelectorAll("[data-test='color-card']")
	expect(card.length).toBe(8)
});