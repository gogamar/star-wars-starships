import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStarships } from "../redux/starshipSlice";
import StarshipList from "../stories/StarshipList";

const Starships = () => {
  const dispatch = useDispatch();

  const { list } = useSelector((state) => state.starships);

  // Fetch starships on initial load
  useEffect(() => {
    if (!list.length) {
      dispatch(fetchStarships(null));
    }
  }, [dispatch, list.length]);

  console.log("starships", list.length);

  return (
    <div className="mb-6">
      <StarshipList starships={list} />
    </div>
  );
};

export default Starships;
