import { FolderBlockProps } from "@githubnext/blocks";
import { Box, SelectPanel, Spinner } from "@primer/react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { makeLoadTechDebt } from "./makeLoadTechDebt";
import { File } from "./File";
import { FileList } from "./FileList";
import { makeLoadCommits } from "./makeLoadCommits";

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
  const defaultKeys = ["ts"];
  const [open, onOpenChange] = useState(false);
  const [filter, onFilterChange] = useState("");

  const [selectedIds, setSelectedIds] = useState(
    defaultKeys.filter((key) => availableKeys.includes(key))
  );
  const availableItems = availableKeys.map((key) => ({ text: key, id: key }));
  const items = availableItems.filter((item) =>
    item.text.toLowerCase().startsWith(filter.toLowerCase())
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
          <SelectPanel
            placeholderText="Included file extensions"
            onOpenChange={onOpenChange}
            open={open}
            items={items}
            selected={availableItems.filter((item) =>
              selectedIds.includes(item.id)
            )}
            onFilterChange={onFilterChange}
            onSelectedChange={(
              items?:
                | { text?: string; id?: string | number }[]
                | { text?: string; id?: string | number }
            ) => {
              if (Array.isArray(items)) {
                setSelectedIds(items.filter(hasId).map((item) => item.id));
                return;
              }
              setSelectedIds(typeof items?.id !== "string" ? [] : [items.id]);
            }}
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

function hasId(val: unknown): val is { id: string } {
  return typeof (val as { id: unknown }).id === "string";
}
