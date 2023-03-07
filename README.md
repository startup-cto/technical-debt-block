# Technical Debt Block

This GitHub block allows to discover technical debt in a repository and to roughly prioritize which files to clean up first.

There's [an article](https://startup-cto.net/easily-identify-technical-debt-in-any-repository/?utm_source=startup-cto%2Ftechnical-debt-block&utm_medium=GitHub) with more details!

## Usage

1. Open your repository on GitHub Next Blocks preview, e.g. if the repository is located at `https://github.com/owner/repo`,
   then go to [https://blocks.githubnext.com/owner/repo](https://blocks.githubnext.com/owner/repo)
2. Select the root folder of your project (or the folder that you want to explore) in the list on the left.
3. On top, select the button labelled `Block: ...` and paste the url of this repo ([`https://github.com/startup-cto/technical-debt-block`](https://github.com/startup-cto/technical-debt-block)) there.
4. Explore your technical debt.

## How does it work

This block is meant to help prioritize which files to clean up first. For this, it calculates a complexity for each file.
Complexity is the product of the file size and the number of commits that touched the file over the last 6 months.
Files that have not been touched in the last 6 months will be filtered out.

The file size is a proxy for the number of lines in the file, which is a proxy for how complex the file itself is.
It could make sense to use a more accurate measure like cyclomatic complexity for each file, but usually file size is
good enough to make a first assessment.

The number of commits in the last 6 months is a proxy for how often a file will be touched in the near future.
If a file is not touched for a while, then even if it is quite complex, refactoring it might not be worth it right now.
