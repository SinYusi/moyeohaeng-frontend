import type { ReactNode } from 'react';

interface LoadingSpinnerProps {
  className?: string;
}

const LoadingSpinner = ({ className = "" }: LoadingSpinnerProps) => (
  <div className={`flex justify-center items-center h-[50vh] ${className}`}>
    <div className="text-lg">로딩중...</div>
  </div>
);

interface ErrorMessageProps {
  message: string;
  className?: string;
}

const ErrorMessage = ({ message, className = "" }: ErrorMessageProps) => (
  <div className={`flex justify-center items-center h-[50vh] ${className}`}>
    <div className="text-lg text-red-500">Error: {message}</div>
  </div>
);

interface AsyncBoundaryProps {
  children: ReactNode;
  loading: boolean;
  error: string | null;
}

const AsyncBoundary = ({ children, loading, error }: AsyncBoundaryProps) => {
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  return <>{children}</>;
};

export { AsyncBoundary, LoadingSpinner, ErrorMessage };
export default AsyncBoundary;
