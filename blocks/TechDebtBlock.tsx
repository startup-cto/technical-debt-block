import { FolderBlockProps } from "@githubnext/blocks";
import { Box } from "@primer/react";
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
          <table style={{ textAlign: "left" }}>
            <thead>
              <tr>
                <th className="p-1">Path</th>
                <th className="p-1">Commit count</th>
                <th className="p-1">File size</th>
                <th className="p-1">Complexity</th>
              </tr>
            </thead>
            <tbody>
              {data.map(({ path, commitCount, size, complexity }) => (
                <tr key={path}>
                  <td
                    className="p-1"
                    onClick={() => props.onNavigateToPath(path)}
                  >
                    {path}
                  </td>
                  <td className="p-1">{commitCount}</td>
                  <td className="p-1">{size}</td>
                  <td className="p-1">{complexity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </Box>
    </Box>
  );
}
