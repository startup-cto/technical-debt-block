import { ThemeProvider } from "@primer/react";
import type { Preview } from "@storybook/react";
import "@primer/css/dist/base.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "light",
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [(Story) =>  <ThemeProvider><Story /></ThemeProvider>]
};

export default preview;
