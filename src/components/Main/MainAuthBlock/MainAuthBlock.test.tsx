import React from 'react';
import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MainAuthBlock } from '@/components/Main/MainAuthBlock/MainAuthBlock';

describe('main auth block', () => {
  test('Should render main auth block', async () => {
    render(<MainAuthBlock />);
    expect(screen.getByText('Welcome!')).toBeDefined();
  });
});
