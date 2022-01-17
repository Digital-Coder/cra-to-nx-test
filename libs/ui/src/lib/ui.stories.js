import Ui from "./ui";

export default {
  component: Ui,
  title: "Ui",
};

const Template = (args) => <Ui {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
