import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import HelpPage from './HelpPage';

describe('help page', () => {
  it('has instructions for families, coaches, the admin and phone install', () => {
    render(<HelpPage />);
    expect(screen.getByTestId('help-title')).toBeInTheDocument();
    for (const id of ['players', 'coaches', 'admin', 'phone']) expect(screen.getByTestId(`help-${id}`)).toBeInTheDocument();
    expect(screen.getByText(/Add to Home Screen/, { selector: 'strong' })).toBeInTheDocument();
  });
});
