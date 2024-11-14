const StarshipList = ({ starships }) => {
  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {starships.map((starship) => {
        const parts = starship.url.split("/");
        const starshipId = parts[parts.length - 2];

        if (!starshipId) return null;

        return (
          <div key={starshipId} className="cursor-pointer">
            <div className="bg-gray-900 bg-opacity-50 hover:bg-opacity-70 transition-all duration-300 p-4 cursor-pointer w-full">
              <h2 className="text-gray-200 text-lg uppercase tracking-wider">
                {starship.name}
              </h2>
              <p className="text-gray-400 text-sm mt-1">{starship.model}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StarshipList;
