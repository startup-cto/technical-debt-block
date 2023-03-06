import { FolderBlockProps } from "@githubnext/blocks";
import { Box, Spinner } from "@primer/react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { makeLoadTechDebt } from "./makeLoadTechDebt";
import { File } from "./File";
import { FileList } from "./FileList";

type Props = Pick<
  FolderBlockProps,
  "context" | "tree" | "onRequestGitHubEndpoint" | "onNavigateToPath"
>;

export default function TechDebtBlock({
  context: { owner, repo, sha },
  onNavigateToPath,
  onRequestGitHubEndpoint,
  tree,
}: Props) {
  const [files, setFiles] = useState<File[] | null>(null);
  useEffect(() => {
    const loadTechDebt = makeLoadTechDebt((path: string) =>
      onRequestGitHubEndpoint("GET /repos/{owner}/{repo}/commits", {
        path,
        owner,
        repo,
        sha,
        since: dayjs().subtract(6, "months").toISOString(),
      })
    );
    void loadTechDebt(tree).then(setFiles);
  }, [owner, repo, onRequestGitHubEndpoint, tree]);
  return (
    <Box p={4}>
      <Box
        borderColor="border.default"
        borderWidth={1}
        borderStyle="solid"
        borderRadius={6}
        overflow="hidden"
      >
        <Box
          bg="canvas.subtle"
          p={3}
          borderBottomWidth={1}
          borderBottomStyle="solid"
          borderColor="border.default"
        >
          This is the folder content.
        </Box>
        <Box p={4}>
          {files == null ? (
            <Spinner />
          ) : (
            <FileList onNavigateToPath={onNavigateToPath} files={files} />
          )}
        </Box>
      </Box>
    </Box>
  );
}
