import { FolderBlockProps } from "@githubnext/blocks";
import { ActionList, Box } from "@primer/react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { makeLoadTechDebt } from "./makeLoadTechDebt";

export default function TechDebtBlock(props: FolderBlockProps) {
  const [data, setData] = useState<
    { path: string; commitCount: number; size: number; complexity: number }[]
  >([]);
  const {
    context: { owner, repo },
    onRequestGitHubEndpoint,
    tree,
  } = props;
  useEffect(() => {
    const loadTechDebt = makeLoadTechDebt((path: string) =>
      onRequestGitHubEndpoint("GET /repos/{owner}/{repo}/commits", {
        path,
        owner,
        repo,
        since: dayjs().subtract(6, "months").toISOString(),
      })
    );
    void loadTechDebt(tree).then(setData);
  }, [owner, repo, onRequestGitHubEndpoint, tree]);
  if (data.length === 0) {
    return <Box>Loading</Box>;
  }
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
          <ActionList>
            {data.map(({ path, commitCount, size, complexity }) => (
              <ActionList.Item
                key={path}
                onClick={() => props.onNavigateToPath(path)}
              >
                {path}
                <ActionList.TrailingVisual>
                  {commitCount} commits, {size} kB size, {complexity} complexity
                </ActionList.TrailingVisual>
              </ActionList.Item>
            ))}
          </ActionList>
        </Box>
      </Box>
    </Box>
  );
}
