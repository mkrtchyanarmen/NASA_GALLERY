import { useQuery } from '@tanstack/react-query';
import Utils from '@utils';

export const useDataFromJson = (id: string, isEnabled: boolean) => {
  const { data } = useQuery({
    queryFn: async () => Utils.getMetadataAndImage(id),
    queryKey: [id],
    // Being enabled when componen is in the view
    enabled: isEnabled,
  });

  return data;
};
