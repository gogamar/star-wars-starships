import Navbar from "./Navbar";

// Define component metadata
export default {
  title: "Components/Navbar",
  component: Navbar,
  argTypes: {
    user: { control: "object" },
    onLogin: { action: "onLogin" },
    onLogout: { action: "onLogout" },
    onCreateAccount: { action: "onCreateAccount" },
  },
};

// Template function for creating Navbar stories
const Template = (args) => <Navbar {...args} />;

// Default Navbar story without user (logged out)
export const LoggedOut = Template.bind({});
LoggedOut.args = {
  user: null,
};

// Navbar story with a logged-in user
export const LoggedIn = Template.bind({});
LoggedIn.args = {
  user: { name: "Luke Skywalker" },
};

// Navbar story with navigation links highlighted
export const WithNavigation = Template.bind({});
WithNavigation.args = {
  user: { name: "Leia Organa" },
};
