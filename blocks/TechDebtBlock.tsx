import { FolderBlockProps } from "@githubnext/blocks";
import { Box, Spinner } from "@primer/react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { makeLoadTechDebt } from "./makeLoadTechDebt";
import { File } from "./File";
import { FileList } from "./FileList";
import { makeLoadCommits } from "./makeLoadCommits";
import { ExtensionSelector } from "./ExtensionSelector";

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
    const loadCommits = makeLoadCommits(onRequestGitHubEndpoint);
    const loadTechDebt = makeLoadTechDebt((path: string) =>
      loadCommits({
        path,
        owner,
        repo,
        sha,
        since: dayjs().subtract(6, "months").toISOString(),
      })
    );
    void loadTechDebt(tree).then(setFiles);
  }, [owner, repo, onRequestGitHubEndpoint, tree]);

  const availableKeys = ["ts", "js", "tsx", "jsx"];
  const defaultKeys = ["ts", "js", "tsx", "jsx", "css", "json", "yml", "yaml"];
  const [selectedExtensions, onSelectExtensions] = useState(
    defaultKeys.filter((key) => availableKeys.includes(key))
  );

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
          <ExtensionSelector
            selectedExtensions={selectedExtensions}
            onSelectExtensions={onSelectExtensions}
            availableKeys={availableKeys}
          />
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
