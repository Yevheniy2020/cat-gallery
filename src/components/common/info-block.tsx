import { FC } from "react";

interface InfoBlockProps {
  title: string;
  description?: string;
}

const ErrorBlock: FC<InfoBlockProps> = ({ title, description }) => {
  return (
    <div className="text-center pt-12 pb-6">
      <h3 className="text-xl font-semibold text-zinc-300 mb-2">{title}</h3>
      {description && <p className="text-zinc-400">{description}</p>}
    </div>
  );
};

export default ErrorBlock;
