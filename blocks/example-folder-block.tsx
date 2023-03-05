import {FolderBlockProps} from "@githubnext/blocks";
import {Box} from "@primer/react";
import {useEffect, useState} from "react";

export default function ExampleFolderBlock(props: FolderBlockProps) {
    const [data, setData] = useState<{ path: string, commitCount: number, size: number, complexity: number }[]>([])
    useEffect(() => {
        const {owner, repo} = props.context;
        Promise.all(props.tree.filter(item => item.type === 'blob' && item.path?.match(/\.(tsx?|jsx?)$/)).map(async ({path = '/', size}) => ({
            path,
            size: size ?? 0,
            commitCount: (await props.onRequestGitHubEndpoint('GET /repos/{owner}/{repo}/commits', {
                path,
                owner,
                repo
            })).length
        }))).then(results => {
            setData(results.map(result => ({ ...result, complexity: result.size * result.commitCount})).sort((file1, file2) => file2.complexity - file1.complexity))
        })
    }, []);
    if (data.length === 0) {
      return <Box>Loading</Box>
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
                    <table style={{textAlign: "left"}}>
                        <thead>
                        <tr>
                            <th className="p-1">Path</th>
                          <th className="p-1">Commit count</th>
                          <th className="p-1">File size</th>
                          <th className="p-1">Complexity</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map(({path, commitCount, size, complexity}) => (
                            <tr key={path}>
                              <td className="p-1" onClick={() => props.onNavigateToPath(path)}>{path}</td>
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
