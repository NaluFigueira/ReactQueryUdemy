import { createStandaloneToast } from '@chakra-ui/react';
import { QueryClient, QueryClientConfig } from '@tanstack/react-query';

import { theme } from '../theme';

const toast = createStandaloneToast({ theme });

function queryErrorHandler(error: unknown): void {
  // error is type unknown because in js, anything can be an error (e.g. throw(5))
  const title =
    error instanceof Error ? error.message : 'error connecting to server';

  // prevent duplicate toasts
  toast.closeAll();
  toast({ title, status: 'error', variant: 'subtle', isClosable: true });
}

export function generateQueryClient(options?: Partial<QueryClientConfig>) {
  return new QueryClient({
    ...options,
    defaultOptions: {
      queries: {
        staleTime: 600000,
        cacheTime: 900000,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        onError: queryErrorHandler,
        ...options?.defaultOptions.queries,
      },
      mutations: {
        onError: queryErrorHandler,
        ...options?.defaultOptions.mutations,
      },
    },
  });
}

export const queryClient = generateQueryClient();
