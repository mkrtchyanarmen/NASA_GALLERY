import { useQuery } from '@tanstack/react-query';

import { getMetadata } from './utils';

export const useDataFromJson = (href: string, isEnabled: boolean) => {
  const { data } = useQuery({
    queryFn: async () => getMetadata(href),
    queryKey: [href],
    enabled: isEnabled,
  });

  return data;
};
