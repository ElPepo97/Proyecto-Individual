import { render, screen } from '@testing-library/react';
import Pagination from './Pagination';

test('renders 26', () => {
    render(<Pagination />);
    const title = screen.getByText(26);
    expect(title).toBeInTheDocument();
});