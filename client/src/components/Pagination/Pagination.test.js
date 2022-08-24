import { render, screen } from '@testing-library/react';
import Pagination from './Pagination';

test('renders ▶', () => {
    render(<Pagination />);
    const title = screen.getByText("▶");
    expect(title).toBeInTheDocument();
});