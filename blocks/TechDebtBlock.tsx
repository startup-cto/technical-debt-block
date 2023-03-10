import { FolderBlockProps } from "@githubnext/blocks";
import { Box, Spinner } from "@primer/react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { makeLoadTechDebt } from "./makeLoadTechDebt";
import { File } from "./File";
import { FileList } from "./FileList";
import { makeLoadCommits } from "./makeLoadCommits";
import { ExtensionSelector } from "./ExtensionSelector";
import { getFileExtension } from "./getFileExtension";

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
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);
  const defaultKeys = ["ts", "js", "tsx", "jsx", "css", "json", "yml", "yaml"];
  const availableKeys = [
    ...new Set(
      tree
        .filter((treeItem) => treeItem.type === "blob")
        .map((treeItem) => getFileExtension(treeItem.path ?? ""))
        .filter((extension) => extension !== "")
    ),
  ];
  const [selectedExtensions, onSelectExtensions] = useState(
    defaultKeys.filter((key) => availableKeys.includes(key))
  );

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
    setLoading(true);
    void loadTechDebt(
      tree.filter((treeItem) =>
        selectedExtensions.includes(getFileExtension(treeItem.path ?? ""))
      )
    ).then((files) => {
      setFiles(files);
      setLoading(false);
    });
  }, [owner, repo, onRequestGitHubEndpoint, tree, selectedExtensions]);

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
          <p>
            Files in this folder, sorted by their estimated technical debt.
            Technical debt is calculated by multiplying the size in kB with the
            number of commits that touched that file over the last 6 months.
          </p>
          {loading ? (
            <Spinner />
          ) : (
            <FileList
              onNavigateToPath={onNavigateToPath}
              files={files.filter((file) =>
                selectedExtensions.includes(getFileExtension(file.path))
              )}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}
