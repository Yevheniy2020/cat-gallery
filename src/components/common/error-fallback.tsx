import { Button } from "@/components/ui/button";
import { FC } from "react";
import { FallbackProps } from "react-error-boundary";
import InfoBlock from "./info-block";

const ErrorFallback: FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert" className="text-center text-red-500 p-8">
      <InfoBlock title="Something went wrong!" description={error.message} />
      <Button onClick={resetErrorBoundary} variant="danger">
        Try again
      </Button>
    </div>
  );
};

export default ErrorFallback;
