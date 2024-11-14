import { MemoryRouter } from "react-router-dom";
import StarshipList from "./StarshipList";

// Default export with Storybook metadata
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

// Sample data to simulate starships
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

// Story for displaying StarshipList with sample data
export const Default = () => <StarshipList starships={exampleStarships} />;
