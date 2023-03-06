import { FolderBlockProps } from "@githubnext/blocks";

export function makeLoadCommits(
  onRequestGitHubEndpoint: FolderBlockProps["onRequestGitHubEndpoint"]
) {
  return function ({
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
    return onRequestGitHubEndpoint("GET /repos/{owner}/{repo}/commits", {
      path,
      owner,
      repo,
      sha,
      since,
      per_page: 100,
    });
  };
}
