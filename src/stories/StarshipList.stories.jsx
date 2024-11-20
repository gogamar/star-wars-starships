import { MemoryRouter } from "react-router-dom";
import StarshipList from "./StarshipList";

export default {
  title: "Components/StarshipList",
  component: StarshipList,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/"]}>
        <Story />
      </MemoryRouter>
    ),
  ],
};

const exampleStarships = [
  {
    name: "X-Wing",
    model: "T-65 X-wing",
    url: "https://swapi.dev/api/starships/12/",
  },
  {
    name: "Millennium Falcon",
    model: "YT-1300 light freighter",
    url: "https://swapi.dev/api/starships/10/",
  },
  {
    name: "TIE Fighter",
    model: "Twin Ion Engine Fighter",
    url: "https://swapi.dev/api/starships/13/",
  },
];

export const Default = () => <StarshipList starships={exampleStarships} />;
