const Spinner = ({ isLoading }) => {
  return (
    isLoading && (
      <div className="flex justify-center items-center">
        <div
          className={`animate-spin rounded-full border-4 border-t-transparent text-yellow-500 h-8 w-8`}
          role="status"
        />
      </div>
    )
  );
};

export default Spinner;
