import List from "./List";

const mockElements = [
  { id: "1", name: "Luke Skywalker" },
  { id: "2", name: "Darth Vader" },
  { id: "3", name: "Leia Organa" },
  { id: "4", name: "Han Solo" },
  { id: "5", name: "Obi-Wan Kenobi" },
  { id: "6", name: "Yoda" },
  { id: "7", name: "C-3PO" },
  { id: "8", name: "R2-D2" },
];

export default {
  title: "Components/List",
  component: List,
};

const Template = (args) => <List {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "Star Wars Characters",
  elements: mockElements,
};
