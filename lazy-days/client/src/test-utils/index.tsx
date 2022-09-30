/* eslint-disable no-console */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, RenderResult } from '@testing-library/react';
import { ReactElement } from 'react';
import { generateQueryClient } from 'react-query/queryClient';

export function renderWithQueryClient(
  ui: ReactElement,
  client?: QueryClient,
): RenderResult {
  const queryClient =
    client ??
    generateQueryClient({
      logger: { error: () => null, log: console.log, warn: console.warn },
      defaultOptions: { queries: { retry: false } },
    });

  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
}
