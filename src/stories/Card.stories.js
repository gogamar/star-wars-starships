import Card from "./Card";

// Mock data for the Card
const mockSubject = {
  id: "1",
  name: "Luke Skywalker",
};

export default {
  title: "Components/Card",
  component: Card,
};

const Template = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {
  subject: mockSubject,
};

export const WithCustomSubject = Template.bind({});
WithCustomSubject.args = {
  subject: {
    id: "2",
    name: "Darth Vader",
  },
};
