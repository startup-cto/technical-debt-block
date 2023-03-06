import { describe, expect, it } from "@jest/globals";
import { Octokit } from "@octokit/core";
import dayjs from "dayjs";
import { makeLoadCommits } from "./makeLoadCommits";
import { FolderBlockProps } from "@githubnext/blocks";

describe("makeLoadCommits", () => {
  it("loads an array of commits", async () => {
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    const onRequestGitHubEndpoint: FolderBlockProps["onRequestGitHubEndpoint"] =
      async (...parameters: Parameters<typeof octokit.request>) =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        (await octokit.request(...parameters)).data;
    const loadCommits = makeLoadCommits(onRequestGitHubEndpoint);

    const response = await loadCommits({
      path: "/rush.json",
      owner: "startup-cto",
      repo: "blog",
      sha: "main",
      since: dayjs().subtract(6, "months").toISOString(),
    });

    expect(response).toBeInstanceOf(Array);
  });

  it("loads multiple pages of commits", async () => {
    const length = 310;
    const data = new Array(length).fill({});
    const onRequestGitHubEndpoint = (
      _path: string,
      { per_page = 30, page = 1 }: any
    ) => Promise.resolve(data.slice((page - 1) * per_page, page * per_page));
    const loadCommits = makeLoadCommits(onRequestGitHubEndpoint);

    const response = await loadCommits({
      path: "/rush.json",
      owner: "startup-cto",
      repo: "blog",
      sha: "main",
      since: dayjs().subtract(6, "months").toISOString(),
    });

    expect(response).toHaveLength(length);
  });
});
