import type { Meta, StoryObj } from "@storybook/react";

import TechDebtBlock from "./TechDebtBlock";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  component: TechDebtBlock,
  tags: ["autodocs"],
  argTypes: {
    onNavigateToPath: { action: "navigate" },
  },
} satisfies Meta<typeof TechDebtBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Default: Story = {
  args: {
    context: {
      folder: "/",
      path: "/",
      repo: "repo",
      sha: "sha",
      owner: "owner",
    },
    tree: [
      { type: "folder", path: "/.github" },
      { type: "blob", path: "/test.ts", size: 3000 },
      { type: "blob", path: "/another.ts", size: 2000 },
    ],
    onRequestGitHubEndpoint: (_path, { page = 1 }: any = {}) =>
      Promise.resolve(page === 1 ? [{}] : []),
  },
};

export const Loading: Story = {
  args: {
    context: {
      folder: "/",
      path: "/",
      repo: "repo",
      sha: "sha",
      owner: "owner",
    },
    tree: [{ type: "blob", path: "/test.ts", size: 3000 }],
    onRequestGitHubEndpoint: () =>
      new Promise(() => {
        // Never return
      }),
  },
};

export const Empty: Story = {
  args: {
    context: {
      folder: "/",
      path: "/",
      repo: "repo",
      sha: "sha",
      owner: "owner",
    },
    tree: [],
    onRequestGitHubEndpoint: () => Promise.resolve([]),
  },
};
