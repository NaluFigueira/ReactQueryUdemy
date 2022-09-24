import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import type { User } from '../../../../../shared/types';
import { axiosInstance, getJWTHeader } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import {
  clearStoredUser,
  getStoredUser,
  setStoredUser,
} from '../../../user-storage';

async function getUser(user: User | null): Promise<User | null> {
  if (!user) return null;
  const { data }: AxiosResponse<{ user: User }> = await axiosInstance.get(
    `/user/${user.id}`,
    {
      headers: getJWTHeader(user),
    },
  );
  return data.user;
}

interface UseUser {
  user: User | null;
  updateUser: (user: User) => void;
  clearUser: () => void;
}

export function useUser(): UseUser {
  const queryClient = useQueryClient();
  const { data: user } = useQuery([queryKeys.user], () => getUser(user), {
    initialData: getStoredUser(),
    onSuccess: (receivedData: User | null) => {
      if (!receivedData) {
        clearStoredUser();
      } else {
        setStoredUser(receivedData);
      }
    },
  });

  function updateUser(newUser: User): void {
    queryClient.setQueryData([queryKeys.user], newUser);
    setStoredUser(newUser);
  }

  function clearUser() {
    queryClient.setQueryData([queryKeys.user], null);
    queryClient.removeQueries([queryKeys.appointments, queryKeys.user]);
    clearStoredUser();
  }

  return { user, updateUser, clearUser };
}
