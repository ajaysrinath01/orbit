import { execSync } from "child_process";

const cwd = "/vercel/share/v0-project";

function run(cmd) {
  console.log(`> ${cmd}`);
  try {
    const output = execSync(cmd, { cwd, encoding: "utf-8", stdio: "pipe" });
    if (output.trim()) console.log(output.trim());
    return output.trim();
  } catch (e) {
    console.log("EXIT CODE:", e.status);
    console.log("STDERR:", e.stderr?.trim() || "(empty)");
    console.log("STDOUT:", e.stdout?.trim() || "(empty)");
    return "";
  }
}

console.log("=== Git Config ===");
run("git config --get remote.origin.url");

console.log("\n=== Current Branch ===");
run("git branch -v");

console.log("\n=== All Branches (including remote) ===");
run("git branch -av");

console.log("\n=== Recent Commits ===");
run("git log --oneline -5");

console.log("\n=== Git Remote Info ===");
run("git remote -v");

console.log("\n=== Check if main exists on remote ===");
run("git ls-remote --heads origin main");

console.log("\n=== Try pushing again with verbose ===");
run("git push origin HEAD:main --force --verbose");
