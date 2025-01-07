import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@/components/ui/Button";

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary = () => <Button variant={"default"}>Button</Button>;
export const Secondary = () => <Button variant={"secondary"}>Button</Button>;
export const Outline = () => <Button variant={"outline"}>Button</Button>;
export const Destructive = () => (
  <Button variant={"destructive"}>Button</Button>
);
export const Link = () => <Button variant={"link"}>Button</Button>;
export const Ghost = () => <Button variant={"ghost"}>Button</Button>;
