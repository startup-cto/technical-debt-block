import { FolderBlockProps } from "@githubnext/blocks";

export function makeLoadCommits(
  onRequestGitHubEndpoint: FolderBlockProps["onRequestGitHubEndpoint"]
) {
  return async function ({
    path,
    owner,
    repo,
    sha,
    since,
  }: {
    path: string;
    owner: string;
    repo: string;
    sha: string;
    since: string;
  }) {
    const result = [];
    let page = 1;
    let nextPage: unknown[];
    do {
      nextPage = await onRequestGitHubEndpoint(
        "GET /repos/{owner}/{repo}/commits",
        {
          path,
          owner,
          repo,
          sha,
          since,
          page,
          per_page: 100,
        }
      );
      result.push(...nextPage);
      page++;
    } while (nextPage.length > 0);
    return result;
  };
}
