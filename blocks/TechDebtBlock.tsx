import { FolderBlockProps } from "@githubnext/blocks";
import { ActionList, Box } from "@primer/react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { makeLoadTechDebt } from "./makeLoadTechDebt";

type Props = Pick<
  FolderBlockProps,
  "context" | "tree" | "onRequestGitHubEndpoint" | "onNavigateToPath"
>;

interface File {
  path: string;
  commitCount: number;
  size: number;
  complexity: number;
}

function FileList({
  files,
  onNavigateToPath,
}: {
  files: File[];
  onNavigateToPath: (path: string) => void;
}) {
  if (files.length === 0) {
    return <Box>Loading</Box>;
  }
  return (
    <ActionList>
      {files.map(({ path, commitCount, size, complexity }) => (
        <ActionList.Item key={path} onClick={() => onNavigateToPath(path)}>
          {path}
          <ActionList.TrailingVisual>
            {commitCount} commits, {size / 1024} kB size, {complexity}{" "}
            complexity
          </ActionList.TrailingVisual>
        </ActionList.Item>
      ))}
    </ActionList>
  );
}

export default function TechDebtBlock({
  context: { owner, repo },
  onNavigateToPath,
  onRequestGitHubEndpoint,
  tree,
}: Props) {
  const [files, setFiles] = useState<File[]>([]);
  useEffect(() => {
    const loadTechDebt = makeLoadTechDebt((path: string) =>
      onRequestGitHubEndpoint("GET /repos/{owner}/{repo}/commits", {
        path,
        owner,
        repo,
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
          <FileList onNavigateToPath={onNavigateToPath} files={files} />
        </Box>
      </Box>
    </Box>
  );
}
