import axios from 'axios';

export type ItemType = {
  data: {
    center: string;
    date_created: Date;
    description: string;
    description_508: string;
    keywords: string[];
    media_type: 'image' | 'video' | 'audio';
    nasa_id: string;
    secondary_creator: string;
    title: string;
  }[];
  href: string;
  links: { href: string; rel: string; render: '' }[];
};

export type SearchImagesResponseType = {
  items: ItemType[];
  links: string[];
};
export type SearchImagesParams = {
  q: string;
  year_end: number | null;
  year_start: number | null;
};

const API_URL = import.meta.env.VITE_API_URL;
const baseURL = `${API_URL}/search`;

export const searchImages = async (params: SearchImagesParams) => {
  const response = await axios<{ collection: SearchImagesResponseType }>({
    baseURL,
    params: { ...params, media_type: 'image' },
  });

  return response.data;
};
