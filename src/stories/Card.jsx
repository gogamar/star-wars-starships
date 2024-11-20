import "./card.css";

const Card = ({ element }) => {
  const isPilot = element.name !== undefined;

  return (
    <div className="overflow-hidden rounded-lg bg-gray-900 shadow relative pb-6">
      <div className="relative">
        <img
          src={`https://starwars-visualguide.com/assets/img/${
            isPilot ? "characters" : "films"
          }/${element.id}.jpg`}
          alt={isPilot ? element.name : element.title}
          className="w-full h-72 object-cover"
        />
        <div className="absolute bottom-0 w-full border-b-4 border-red-500"></div>
      </div>

      <div className="bg-gray-900 px-4 pt-4 pb-2 sm:px-6 text-center">
        {isPilot ? (
          <span className="text-gray-500 uppercase font-bold">
            {element.name}
          </span>
        ) : (
          <div className="text-gray-500">
            <span className="uppercase font-bold">{element.title}</span>
            <br />
            <span>Episode {element.episode_id}</span>
          </div>
        )}
      </div>
      <div className="rectangle-container">
        <div className="rectangle"></div>
        <div className="rectangle-overlay"></div>
      </div>
    </div>
  );
};

export default Card;
