import Card from "./Card";

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

const Template = (args) => <Card {...args} />;

export const PilotCard = Template.bind({});
PilotCard.args = {
  element: {
    id: 1,
    name: "Luke Skywalker",
  },
};

export const FilmCard = Template.bind({});
FilmCard.args = {
  element: {
    id: 4,
    title: "A New Hope",
    episode_id: 4,
  },
};

export const MissingDataCard = Template.bind({});
MissingDataCard.args = {
  element: {
    id: 99,
  },
};
