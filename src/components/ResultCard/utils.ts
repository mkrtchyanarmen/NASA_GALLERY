import axios from 'axios';

type MetadataType = {
  'AVAIL:Description': string;
  'AVAIL:Description508': string;
  'AVAIL:Location': string;
  'AVAIL:NASAID': string;
  'AVAIL:Photographer': string;
  'AVAIL:Title': string;
};

export type ResolvedMetadataType = {
  description: string;
  id: string;
  img: {
    medium: string;
    original: string;
    small: string;
    thunmb: string;
  };
  location: string;
  photographer: string;
  title: string;
  tumbnail: string;
};

export const getMetadata = async (href: string): Promise<ResolvedMetadataType> => {
  const { data: urls } = await axios<string[]>({
    baseURL: href,
  });

  const metadataUrl = urls[urls.length - 1];

  const resp = await axios<MetadataType>({ baseURL: metadataUrl });

  return {
    description: resp.data['AVAIL:Description'],
    tumbnail: resp.data['AVAIL:Description508'],
    location: resp.data['AVAIL:Location'],
    photographer: resp.data['AVAIL:Photographer'],
    title: resp.data['AVAIL:Title'],
    img: {
      original: urls[0],
      medium: urls[1],
      small: urls[2],
      thunmb: urls[3],
    },
    id: resp.data['AVAIL:NASAID'],
  };
};
