import StarshipCard from "./StarshipCard";

// Default export to define component and metadata
export default {
  title: "Components/StarshipCard",
  component: StarshipCard,
};

// Template function to render the component with args
const Template = (args) => <StarshipCard {...args} />;

// Example data for a sample starship
const exampleStarship = {
  name: "X-Wing",
  starship_class: "Starfighter",
  passengers: "1",
  hyperdrive_rating: "1.0",
  model: "T-65 X-wing",
  max_atmosphering_speed: "1050",
  cost_in_credits: "149999",
  manufacturer: "Incom Corporation",
  length: "12.5",
  crew: "1",
};

// Primary story using the example data
export const Primary = Template.bind({});
Primary.args = {
  selectedStarship: exampleStarship,
};
