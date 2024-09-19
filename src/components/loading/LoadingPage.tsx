import { LoadingSpinner } from "./LoadingSpinner";

const LoadingPage = () => {
  return (
    <div className="loading w-screen h-screen bg-red-100">
      <p>Loading...Please wait</p>
      <LoadingSpinner />
    </div>
  );
};

export default LoadingPage;
