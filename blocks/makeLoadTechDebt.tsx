import { TreeItem } from "@githubnext/blocks";

export const makeLoadTechDebt =
  (loadCommits: (path: string) => Promise<unknown[]>) => (tree: TreeItem[]) =>
    Promise.all(
      tree
        .filter(
          (item) => item.type === "blob" && item.path?.match(/\.(tsx?|jsx?)$/)
        )
        .map(async ({ path = "/", size }) => ({
          path,
          size: size ?? 0,
          commitCount: (await loadCommits(path)).length,
        }))
    ).then((results) => {
      return results
        .map((result) => ({
          ...result,
          complexity: result.size * result.commitCount,
        }))
        .sort((file1, file2) => file2.complexity - file1.complexity);
    });
