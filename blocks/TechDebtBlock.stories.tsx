import type { Meta, StoryObj } from "@storybook/react";

import TechDebtBlock from "./TechDebtBlock";

const meta = {
  component: TechDebtBlock,
  tags: ["autodocs"],
  argTypes: {
    onNavigateToPath: { action: "navigate" },
  },
} satisfies Meta<typeof TechDebtBlock>;

const context = {
  folder: "/",
  path: "/",
  repo: "repo",
  sha: "sha",
  owner: "owner",
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    context,
    tree: [
      { type: "folder", path: "/.github" },
      { type: "blob", path: "/test.ts", size: 3000 },
      { type: "blob", path: "/another.ts", size: 2000 },
    ],
    onRequestGitHubEndpoint: (_path, { page = 1 }: any = {}) =>
      new Promise((resolve) => {
        setTimeout(() => resolve(page === 1 ? [{}] : []), 1000);
      }),
  },
};
export const With20Extensions: Story = {
  args: {
    context,
    tree: [
      { type: "folder", path: "/.github" },
      { type: "blob", path: "/test.ts", size: 3000 },
      { type: "blob", path: "/another.tsx", size: 2000 },
      { type: "blob", path: "/test.js", size: 3000 },
      { type: "blob", path: "/another.jsx", size: 2000 },
      { type: "blob", path: "/test.yml", size: 3000 },
      { type: "blob", path: "/another.yaml", size: 2000 },
      { type: "blob", path: "/test.css", size: 3000 },
      { type: "blob", path: "/another.scss", size: 2000 },
      { type: "blob", path: "/test.md", size: 3000 },
      { type: "blob", path: "/another.mdx", size: 2000 },
      { type: "blob", path: "/.gitignore", size: 2000 },
      { type: "blob", path: "/.eslintignore", size: 2000 },
      { type: "blob", path: "/test.cjs", size: 2000 },
    ],
    onRequestGitHubEndpoint: (_path, { page = 1 }: any = {}) =>
      new Promise((resolve) => {
        setTimeout(() => resolve(page === 1 ? [{}] : []), 1000);
      }),
  },
};

export const Loading: Story = {
  args: {
    context,
    tree: [{ type: "blob", path: "/test.ts", size: 3000 }],
    onRequestGitHubEndpoint: () =>
      new Promise(() => {
        // Never return
      }),
  },
};

export const Empty: Story = {
  args: {
    context,
    tree: [],
    onRequestGitHubEndpoint: () => Promise.resolve([]),
  },
};
