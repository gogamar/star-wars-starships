import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStarships } from "../redux/starshipSlice";
import StarshipList from "../stories/StarshipList";

const Starships = () => {
  const dispatch = useDispatch();
  const starships = useSelector((state) => state.starships.list);

  // Fetch starships on mount (first page)
  useEffect(() => {
    if (!starships.length) {
      dispatch(fetchStarships(null));
    }
  }, [dispatch, starships.length]);

  return (
    <div className="mb-6">
      <StarshipList starships={starships} />
    </div>
  );
};

export default Starships;
