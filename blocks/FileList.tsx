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
    return <>No files found</>;
  }

  return (
    <ActionList>
      {files.map(({ path, commitCount, size, complexity }) => (
        <ActionList.Item key={path} onClick={() => onNavigateToPath(path)}>
          {path}
          <ActionList.TrailingVisual>
            {commitCount} commits, {(size / 1024).toFixed(0)} kB size,{" "}
            {complexity} complexity
          </ActionList.TrailingVisual>
        </ActionList.Item>
      ))}
    </ActionList>
  );
}
