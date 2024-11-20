import StarshipCard from "./StarshipCard";

export default {
  title: "Components/StarshipCard",
  component: StarshipCard,
};

const Template = (args) => <StarshipCard {...args} />;

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

export const Primary = Template.bind({});
Primary.args = {
  selectedStarship: exampleStarship,
};
