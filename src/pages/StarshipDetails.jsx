import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchStarshipDetails } from "../redux/starshipDetailsSlice";
import StarshipCard from "../stories/StarshipCard";
import List from "../stories/List";
import Spinner from "../stories/Spinner";

const StarshipDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selectedStarship, pilots, films, error, loading } = useSelector(
    (state) => state.starshipDetails
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchStarshipDetails(id));
    }
  }, [id, dispatch]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <div className="container mx-auto py-6">
        <h1 className="text-xl tracking-widest uppercase text-gray-500 border-y border-gray-800 py-2 my-6">
          STARSHIP
        </h1>

        <div className="flex justify-end relative h-96">
          <img
            src={`https://starwars-visualguide.com/assets/img/starships/${id}.jpg`}
            alt="Star Wars Starship"
            className="absolute left-0 h-full object-contain w-1/3"
            style={{ zIndex: 0 }}
            onError={(e) => {
              e.target.src =
                "https://starwars-visualguide.com/assets/img/planets/5.jpg";
            }}
          />

          <div className="relative w-2/3 z-10">
            {selectedStarship ? (
              <StarshipCard selectedStarship={selectedStarship} />
            ) : (
              loading && (
                <div
                  className="flex flex-col justify-center mt-4"
                  aria-live="polite"
                >
                  <Spinner isLoading={loading} />
                  <br />
                  <p>Loading Starship Details...</p>
                </div>
              )
            )}
          </div>
        </div>
        {pilots.length > 0 && <List elements={pilots} title="PILOTS" />}
        {films.length > 0 && <List elements={films} title="FILMS" />}
      </div>

      {error && <p>Error: {error}</p>}
    </>
  );
};

export default StarshipDetails;
