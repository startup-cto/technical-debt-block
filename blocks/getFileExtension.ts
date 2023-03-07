export function getFileExtension(path: string): string {
  return path.match(/\.(?<ext>[^.]+)$/)?.[1] ?? "";
}
