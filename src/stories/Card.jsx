const Card = ({ subject }) => (
  <div className="overflow-hidden rounded-lg bg-gray-900 shadow">
    {/* Image Section */}
    <div className="relative">
      <img
        src={`https://starwars-visualguide.com/assets/img/characters/${subject.id}.jpg`}
        alt={subject.name}
        className="w-full h-72 object-cover"
      />
      <div className="absolute bottom-0 w-full border-b-4 border-red-500"></div>
    </div>

    {/* Name Section */}
    <div className="bg-gray-900 px-4 py-4 sm:px-6 text-center">
      <span className="text-gray-500 uppercase font-bold">{subject.name}</span>
    </div>
  </div>
);

export default Card;
