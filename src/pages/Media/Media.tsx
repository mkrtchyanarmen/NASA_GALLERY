import { useParams } from 'react-router-dom';

const Media = () => {
  const { nasa_id } = useParams<{ nasa_id: string }>();

  const handleGoBack = () => {
    // TODO: change history back
    // eslint-disable-next-line no-restricted-globals
    history.back();
  };

  return (
    <div className="p-8">
      <button onClick={handleGoBack}>{'< Back to Search'}</button>
    </div>
  );
};

export default Media;
