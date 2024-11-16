import Card from "./Card";

// Storybook metadata
export default {
  title: "Components/Card",
  component: Card,
  argTypes: {
    element: {
      control: "object",
      description: "The object representing either a pilot or a film",
    },
  },
};

// Template to render the Card component
const Template = (args) => <Card {...args} />;

// Story for a Pilot Card
export const PilotCard = Template.bind({});
PilotCard.args = {
  element: {
    id: 1,
    name: "Luke Skywalker",
  },
};

// Story for a Film Card
export const FilmCard = Template.bind({});
FilmCard.args = {
  element: {
    id: 4,
    title: "A New Hope",
    episode_id: 4,
  },
};

// Story for a Missing Data Card
export const MissingDataCard = Template.bind({});
MissingDataCard.args = {
  element: {
    id: 99,
  },
};
