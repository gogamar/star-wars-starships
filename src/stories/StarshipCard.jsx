import InfoRow from "./InfoRow";

const StarshipCard = ({ selectedStarship }) => {
  const {
    name,
    starship_class,
    passengers,
    hyperdrive_rating,
    model,
    max_atmosphering_speed,
    cost_in_credits,
    manufacturer,
    length,
    crew,
  } = selectedStarship;

  return (
    <div className="border-l-4 border-red-500 bg-gray-900 p-6 rounded-r-lg relative overflow-hidden">
      <div className="z-10 mb-5 text-gray-500">
        <h2 className="text-xl tracking-widest mb-4 uppercase">{name}</h2>
        <p>
          This starship is of {starship_class} class, it&apos;s for {passengers}{" "}
          passengers and has a hyperdrive rating of {hyperdrive_rating}.
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 text-gray-500">
        <InfoRow label="Model" value={model} />
        <InfoRow
          label="Max Atmosphering Speed"
          value={`${max_atmosphering_speed} km/h`}
        />
        <InfoRow label="Cost in credits" value={cost_in_credits} />

        <InfoRow label="Manufacturer" value={manufacturer} />
        <InfoRow label="Length" value={`${length} meters`} />
        <InfoRow label="Crew" value={crew} />
      </div>
    </div>
  );
};

export default StarshipCard;
