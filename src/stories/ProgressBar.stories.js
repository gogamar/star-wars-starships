import ProgressBar from "./ProgressBar";

export default {
  title: "Components/ProgressBar",
  component: ProgressBar,
  argTypes: {
    isLoading: { control: "boolean" },
  },
};

const Template = (args) => <ProgressBar {...args} />;

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};

export const NotLoading = Template.bind({});
NotLoading.args = {
  isLoading: false,
};
