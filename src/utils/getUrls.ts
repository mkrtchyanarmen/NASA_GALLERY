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
