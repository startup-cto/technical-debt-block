import { TreeItem } from "@githubnext/blocks";

export const makeLoadTechDebt =
  (loadCommits: (path: string) => Promise<unknown[]>) =>
  async (tree: TreeItem[]) => {
    const treeWithCommitCount = await Promise.all(
      tree
        .filter(
          (item) => item.type === "blob" && item.path?.match(/\.(tsx?|jsx?)$/)
        )
        .map(async ({ path = "/", size }) => ({
          path,
          size: size ?? 0,
          commitCount: (await loadCommits(path)).length,
        }))
    );
    return treeWithCommitCount
      .map((result) => ({
        ...result,
        complexity: result.size * result.commitCount,
      }))
      .filter((file) => file.complexity > 0)
      .sort((file1, file2) => file2.complexity - file1.complexity);
  };
