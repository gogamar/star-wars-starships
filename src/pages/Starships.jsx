import { useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStarships } from "../redux/starshipsSlice";
import StarshipList from "../stories/StarshipList";

const Starships = () => {
  const dispatch = useDispatch();

  const { list, next } = useSelector((state) => state.starships);

  const observer = useRef();

  // Fetch starships on initial load
  useEffect(() => {
    if (!list.length) {
      dispatch(fetchStarships(null));
    }
  }, [dispatch, list.length]);

  // Fetch more starships when the last element comes into view
  const lastStarshipElementRef = useCallback(
    (node) => {
      if (!next) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && next) {
          dispatch(fetchStarships(next));
        }
      });

      if (node) observer.current.observe(node);
    },
    [next, dispatch]
  );

  console.log("starships", list.length);

  return (
    <div className="mb-6">
      <StarshipList starships={list} />

      {/* Observer for triggering infinite scroll */}
      <div ref={lastStarshipElementRef}></div>
    </div>
  );
};

export default Starships;
