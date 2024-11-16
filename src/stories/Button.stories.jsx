import Button from "./Button";
import "./button.css";

// Storybook metadata
export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    backgroundColor: { control: "color" },
    label: { control: "text" },
    icon: { control: "boolean" },
    loading: { control: "boolean" },
    onClick: { action: "clicked" },
  },
};

// Template to create stories with arguments
const Template = (args) => <Button {...args} />;

// Default Button Story
export const Default = Template.bind({});
Default.args = {
  label: "Button",
};

// Button with Custom Background Color
export const WithBackgroundColor = Template.bind({});
WithBackgroundColor.args = {
  label: "Custom Background",
  backgroundColor: "#4CAF50", // Example color
};

// Button with Icon
export const WithIcon = Template.bind({});
WithIcon.args = {
  label: "Button with Icon",
  icon: true,
};

// Button in Loading State
export const Loading = Template.bind({});
Loading.args = {
  label: "Loading...",
  loading: true,
};

// Button with Icon and Custom Background Color
export const WithIconAndBackground = Template.bind({});
WithIconAndBackground.args = {
  label: "Icon & Custom Background",
  icon: true,
  backgroundColor: "#2196F3",
};
