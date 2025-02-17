import type { Meta, StoryObj } from "@storybook/react";

import { InfiniteMovingCards } from "@/components/ui/InfiniteMovingCards";

const meta = {
  component: InfiniteMovingCards,
} satisfies Meta<typeof InfiniteMovingCards>;

export default meta;

type Story = StoryObj<typeof meta>;

const DummyItems = [
  <div key={0} className="size-16 bg-red-300"></div>,
  <div key={1} className="size-16 bg-orange-300"></div>,
  <div key={2} className="size-16 bg-yellow-300"></div>,
  <div key={3} className="size-16 bg-green-300"></div>,
  <div key={4} className="size-16 bg-cyan-300"></div>,
  <div key={5} className="size-16 bg-blue-300"></div>,
  <div key={6} className="size-16 bg-violet-300"></div>,
];

export const Default: Story = {
  args: {
    items: DummyItems,
  },
};

export const PauseOnHover = () => (
  <>
    <InfiniteMovingCards pauseOnHover items={DummyItems} />
    <InfiniteMovingCards pauseOnHover={false} items={DummyItems} />
  </>
);

export const Left = () => (
  <InfiniteMovingCards direction="left" items={DummyItems} />
);

export const Right = () => (
  <InfiniteMovingCards direction="right" items={DummyItems} />
);

export const Fast = () => (
  <InfiniteMovingCards speed="fast" items={DummyItems} />
);

export const Normal = () => (
  <InfiniteMovingCards speed="normal" items={DummyItems} />
);

export const Slow = () => (
  <InfiniteMovingCards speed="slow" items={DummyItems} />
);
