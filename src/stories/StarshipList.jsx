import { useNavigate } from "react-router-dom";

const StarshipList = ({ starships }) => {
  const navigate = useNavigate();

  const extractStarshipId = (url) => {
    try {
      const parts = url.split("/").filter((part) => part.length > 0);
      const id = parts[parts.length - 1];
      // Ensure the ID is numeric
      return /^\d+$/.test(id) ? id : null;
    } catch {
      return null;
    }
  };

  const handleCardClick = (starshipId) => {
    if (starshipId) {
      navigate(`/starships/${starshipId}`);
    }
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {starships.map((starship) => {
        const starshipId = extractStarshipId(starship.url);

        if (!starshipId) {
          return null;
        }

        return (
          <div
            key={starshipId}
            className="cursor-pointer"
            onClick={() => handleCardClick(starshipId)}
          >
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
