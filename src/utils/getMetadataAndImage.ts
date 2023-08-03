import axios from 'axios';

// API url is comming from env variable
const API_URL = import.meta.env.VITE_API_URL;

const metadataAssetsBaseURL = `${API_URL}/asset`;

type AssetResponseType = {
  items: { href: string }[];
};

// Geting metadata and image url's
export const getUrls = async (nasaId: string) => {
  // Get assets URL
  const response = await axios<{ collection: AssetResponseType }>({
    baseURL: `${metadataAssetsBaseURL}/${nasaId}`,
  });

  const urls = response.data.collection.items;

  // Last url is metadata url
  const metadataUrl = urls[urls.length - 1].href;

  // To have image all sizes
  const img = {
    original: urls[0].href,
    medium: urls[1].href,
    small: urls[2].href,
    thunmb: urls[3].href,
  };

  return { metadataUrl, img };
};

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

export const getMetadataAndImage = async (nasaId: string) => {
  const { metadataUrl, img } = await getUrls(nasaId);
  const metadata = await getMetadata(metadataUrl.replace('http://', 'https://'));

  // Combine images and metadata
  return { ...metadata, img };
};
