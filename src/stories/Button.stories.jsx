import { RocketLaunchIcon } from "@heroicons/react/24/solid";
import Button from "./Button";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    backgroundColor: { control: "color" },
    label: { control: "text" },
    iconComponent: { control: "none" },
    loading: { control: "boolean" },
    onClick: { action: "clicked" },
  },
};

const Template = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "Default Button",
};

export const WithBackgroundColor = Template.bind({});
WithBackgroundColor.args = {
  label: "Button with Background Color",
  backgroundColor: "#4CAF50",
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  label: "Button with Icon",
  iconComponent: RocketLaunchIcon,
};

export const Loading = Template.bind({});
Loading.args = {
  label: "Loading...",
  loading: true,
};

export const WithIconAndBackground = Template.bind({});
WithIconAndBackground.args = {
  label: "Button with Icon & Background",
  iconComponent: RocketLaunchIcon,
  backgroundColor: "#2196F3",
};
