import { useRef, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStarships } from "../redux/starshipsListSlice";
import StarshipList from "../stories/StarshipList";
import Spinner from "../stories/Spinner";

const Starships = () => {
  const dispatch = useDispatch();

  const { list, next, loading } = useSelector((state) => state.starships);

  const observer = useRef();
  const hasFetched = useRef(false);

  // Fetch starships on initial load
  useEffect(() => {
    if (!list.length && !hasFetched.current) {
      dispatch(fetchStarships(null));
      hasFetched.current = true;
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
    <div className="my-6">
      {loading && (
        <div className="flex justify-center mt-4" aria-live="polite">
          <Spinner isLoading={loading} />
        </div>
      )}
      <StarshipList starships={list} />

      {/* Observer for triggering infinite scroll */}
      <div ref={lastStarshipElementRef}></div>
    </div>
  );
};

export default Starships;
