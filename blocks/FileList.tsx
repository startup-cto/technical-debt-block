import { File } from "./File";
import { ActionList } from "@primer/react";

export function FileList({
  files,
  onNavigateToPath,
}: {
  files: File[];
  onNavigateToPath: (path: string) => void;
}) {
  if (files.length === 0) {
    return <>No files found for filtered extensions</>;
  }

  return (
    <ActionList>
      {files.map(({ path, commitCount, size }) => (
        <ActionList.Item key={path} onClick={() => onNavigateToPath(path)}>
          {path}
          <ActionList.TrailingVisual>
            {commitCount} commit{commitCount === 1 ? "" : "s"},{" "}
            {(size / 1024).toFixed(0)} kB size
          </ActionList.TrailingVisual>
        </ActionList.Item>
      ))}
    </ActionList>
  );
}
