import SubmitButton from "./submitButton";

export default {
  component: SubmitButton,
  title: "SubmitButton",
};

const Template = (args) => <SubmitButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  text: "Submit",
  zIndex: "999",
  backgroundColor: "#fed957",
  width: "50px",
  textColor: "#353535",
  loading: false,
};
export const Sizes = () => (
  <>
    <SubmitButton text="default"></SubmitButton>
    <SubmitButton text="small" small />
  </>
);
