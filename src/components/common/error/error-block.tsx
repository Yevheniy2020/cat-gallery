import { FC } from "react";

interface ErrorBlockProps {
  title: string;
  description?: string;
}

const ErrorBlock: FC<ErrorBlockProps> = ({ title, description }) => {
  return (
    <div className="text-center text-white p-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
};

export default ErrorBlock;
