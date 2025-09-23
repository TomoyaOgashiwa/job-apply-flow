// Replace your-framework with nextjs or nextjs-vite
import type { Meta, StoryObj } from "@storybook/nextjs";

import HeadingComponent from "./index";

const meta = {
  component: HeadingComponent,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Meta<typeof HeadingComponent>;
export default meta;

type Story = StoryObj<typeof meta>;

// Interact with the links to see the route change events in the Actions panel.
export const Heading1: Story = {
  args: {
    level: "h1",
    children: "Heading 1",
  },
};

export const Heading2: Story = {
  args: {
    level: "h2",
    children: "Heading 2",
  },
};

export const Heading3: Story = {
  args: {
    level: "h3",
    children: "Heading 3",
  },
};

export const Heading4: Story = {
  args: {
    level: "h4",
    children: "Heading 4",
  },
};

export const Heading5: Story = {
  args: {
    level: "h5",
    children: "Heading 5",
  },
};

export const Heading6: Story = {
  args: {
    level: "h6",
    children: "Heading 6",
  },
};
