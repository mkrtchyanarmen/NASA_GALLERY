import axios from 'axios';

// Icoming metadata type
type MetadataResponseType = {
  'AVAIL:DateCreated': string;
  'AVAIL:Description': string;
  'AVAIL:Description508': string;
  'AVAIL:Keywords': string[];
  'AVAIL:Location': string;
  'AVAIL:NASAID': string;
  'AVAIL:Photographer': string;
  'AVAIL:Title': string;
};

// Apropriate Metadata structure
export type ResolvedMetadataType = {
  date: string;
  description: string;
  id: string;
  keywords: string[];
  location: string;
  photographer: string;
  title: string;
  tumbnail: string;
};

export const getMetadata = async (metadataUrl: string): Promise<ResolvedMetadataType> => {
  // Get metadata
  const response = await axios<MetadataResponseType>({ baseURL: metadataUrl });

  return {
    description: response.data['AVAIL:Description'],
    tumbnail: response.data['AVAIL:Description508'],
    location: response.data['AVAIL:Location'],
    photographer: response.data['AVAIL:Photographer'],
    title: response.data['AVAIL:Title'],
    id: response.data['AVAIL:NASAID'],
    keywords: response.data['AVAIL:Keywords'],
    date: response.data['AVAIL:DateCreated'],
  };
};
