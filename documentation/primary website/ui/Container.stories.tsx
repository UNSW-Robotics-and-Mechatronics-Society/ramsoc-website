import type { Meta, StoryObj } from "@storybook/react";

import { Container } from "@/components/ui/Container";

const meta = {
  component: Container,
} satisfies Meta<typeof Container>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = () => (
  <Container>
    <div className="h-96">Here is some content</div>
  </Container>
);
export const Gradient = () => (
  <Container outerProps={{ variant: "gradient" }}>
    <div className="h-96">Here is some content</div>
  </Container>
);

export const FullWidth: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "When width is set to full, the inner container will match the size of the outer container. To see this in action, go to the full width section of this component documentation and make sure the size of the virtual page being greater than 1200px which can be achieved by zooming out.",
      },
    },
  },
  render: () => (
    <>
      <Container className="mb-8 bg-blue-200" width="full">
        <div className="h-96">Width is set to full</div>
      </Container>
      <Container
        outerProps={{ className: "bg-red-200" }}
        className="bg-blue-200"
      >
        <div className="h-96">Default width</div>
      </Container>
    </>
  ),
};
