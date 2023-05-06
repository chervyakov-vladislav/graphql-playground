import React from 'react';
import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from '@/components/Header/Header';

describe('Header', () => {
  test('Should render header', async () => {
    render(<Header />);
    expect(screen.getByText('Log in')).toBeDefined();
  });
});
