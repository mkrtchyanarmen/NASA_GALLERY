import { FC } from 'react';

export type ButtonProps = {
  text: string;
};
const Button: FC<ButtonProps> = ({ text }) => {
  // TODO: change to reusable component as it's inside components folder
  return (
    <button className="h-8 px-2 bg-blue-900 text-white rounded-md" type="submit">
      {text}
    </button>
  );
};

export default Button;
