const StarshipCard = ({ selectedStarship }) => (
  <div className="h-96 border-l-4 border-red-500 bg-gray-900 p-6 rounded-r-lg mb-4 relative overflow-hidden">
    <div className="z-10 mb-5 text-gray-500">
      <h2 className="text-xl tracking-widest mb-4 uppercase">
        {selectedStarship.name}
      </h2>

      <p>
        This starship is of {selectedStarship.starship_class} class, it&apos;s
        for {selectedStarship.passengers} passengers and has a hyperdrive rating
        of {selectedStarship.hyperdrive_rating}.
      </p>
    </div>

    <div className="relative z-10 grid grid-cols-2 gap-x-8 text-gray-500">
      <div className="space-y-4">
        <p>
          <span className="font-semibold">Model:</span> {selectedStarship.model}
        </p>
        <p>
          <span className="font-semibold">Max Atmosphering Speed:</span>{" "}
          {selectedStarship.max_atmosphering_speed} km/h
        </p>
        <p>
          <span className="font-semibold">Cost in credits:</span>{" "}
          {selectedStarship.cost_in_credits}
        </p>
      </div>
      <div className="space-y-4">
        <p>
          <span className="font-semibold">Manufacturer:</span>{" "}
          {selectedStarship.manufacturer}
        </p>
        <p>
          <span className="font-semibold">Length:</span>{" "}
          {selectedStarship.length} meters
        </p>
        <p>
          <span className="font-semibold">Crew:</span> {selectedStarship.crew}
        </p>
      </div>
    </div>
  </div>
);

export default StarshipCard;
