import { useQuery } from 'react-query';
import { queryEndpoints } from '~/utils/api/query-endpoints';

async function getUserInfos() {
  return queryEndpoints.getUserInfos();
}

export const useGetUserInfos = () => {
  return useQuery('user-infos', () => getUserInfos(), {
    refetchOnWindowFocus: false,
  });
};
