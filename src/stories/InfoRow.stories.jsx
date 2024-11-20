import InfoRow from "./InfoRow";

export default {
  title: "Components/InfoRow",
  component: InfoRow,
};

const Template = (args) => <InfoRow {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "Model",
  value: "X-Wing",
};

export const LongValue = Template.bind({});
LongValue.args = {
  label: "Description",
  value:
    "A starfighter used by the Rebel Alliance, known for its speed and agility in combat.",
};

export const NoValue = Template.bind({});
NoValue.args = {
  label: "Cost",
  value: "Unknown",
};
