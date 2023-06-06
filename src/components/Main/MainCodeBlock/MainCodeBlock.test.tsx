import React from 'react';
import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MainCodeBlock } from '@/components/Main/MainCodeBlock/MainCodeBlock';
import { MainCodeRequest } from '@/components/Main/MainCodeRequest/MainCodeRequest';
import { MainCodeResponce } from '@/components/Main/MainCodeResponce/MainCodeResponce';

describe('main code block', () => {
  test('Should render main auth block', async () => {
    const request = {
      header: 'Ask for what you want',
      codeBlock: <MainCodeRequest />,
    };
    const response = {
      header: 'Get predictable results',
      codeBlock: <MainCodeResponce />,
    };
    render(<MainCodeBlock items={[request, response]} />);
    expect(screen.getByText('Ask for what you want')).toBeDefined();
    expect(screen.getByText('Get predictable results')).toBeDefined();
  });
});
