import Button from "./ui";

export default {
  component: Button,
  title: "Button",
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
