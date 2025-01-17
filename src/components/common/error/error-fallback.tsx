import { Button } from "@/components/ui/button";
import { FC } from "react";
import { FallbackProps } from "react-error-boundary";

const ErrorFallback: FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert" className="text-center text-red-500 p-8">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <p className="mb-4">{error.message}</p>
      <Button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-red-600 text-white rounded"
      >
        Try again
      </Button>
    </div>
  );
};

export default ErrorFallback;
