import { useQuery } from '@tanstack/react-query';

import { getMetadata } from './utils';

export const useDataFromJson = (href: string, isEnabled: boolean) => {
  const { data } = useQuery({
    queryFn: async () => getMetadata(href),
    // Only one queryKey, as each file has it's unique url
    queryKey: [href],
    // Being enabled when componen is in the view
    enabled: isEnabled,
  });

  return data;
};
