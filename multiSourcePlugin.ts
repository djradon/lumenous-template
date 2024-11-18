import { ensureDir, copy } from "https://deno.land/std/fs/mod.ts";
import type Site from "lume/core/site.ts";

function multiSourcePlugin(repos: { url: string; localPath?: string; include: string[] }[]) {
  return async (site: Site) => {
    const targetDir = site.src(); // Combined source directory
    const repoDir = `${targetDir}/_src-repos`; // Directory for repositories within combined directory

    // Ensure the combined source directory and repo directory exist
    await ensureDir(targetDir);
    await ensureDir(repoDir);

    // Add _src-repos to Lume's ignored directories
    site.ignore(repoDir);

    for (const repo of repos) {
      // Infer localPath from the repo URL if not provided
      const inferredLocalPath = repo.url.split("/").pop()?.replace(/\.git$/, "") || "unknown-repo";
      const localRepoPath = `${repoDir}/${repo.localPath || inferredLocalPath}`;

      if (!(await Deno.stat(localRepoPath).catch(() => false))) {
        console.log(`Cloning repository from ${repo.url} into ${localRepoPath}`);
        const cloneCommand = new Deno.Command("git", {
          args: [
            "clone", 
            "--filter=blob:none", 
            "--sparse", 
            repo.url, 
            localRepoPath,
          ],
        });
        await cloneCommand.output();

        console.log(`Configuring sparse checkout for ${repo.url}`);
        const sparseCommand = new Deno.Command("git", {
          args: ["sparse-checkout", "set", ...repo.include],
          cwd: localRepoPath,
        });
        await sparseCommand.output();
      } else {
        console.log(`Pulling updates for ${repo.url}`);
        const pullCommand = new Deno.Command("git", {
          args: ["pull"],
          cwd: localRepoPath,
        });
        await pullCommand.output();
      }

      for (const includePath of repo.include) {
        console.log(`Copying ${localRepoPath}/${includePath} to ${targetDir}`);
        await copy(`${localRepoPath}/${includePath}`, `${targetDir}/${includePath}`, { overwrite: true });
      }
    }
  };
}

export default multiSourcePlugin;
