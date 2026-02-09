import { execSync } from "child_process";

function run(cmd) {
  console.log(`> ${cmd}`);
  try {
    const output = execSync(cmd, { cwd: "/vercel/share/v0-project", encoding: "utf-8", stdio: "pipe" });
    if (output.trim()) console.log(output.trim());
    return output;
  } catch (e) {
    console.log("stderr:", e.stderr?.trim() || "");
    console.log("stdout:", e.stdout?.trim() || "");
    return e.stdout || "";
  }
}

// Check current git status
console.log("--- Git Status ---");
run("git status");
run("git branch -a");

// Check if node_modules is tracked
console.log("\n--- Checking if node_modules is tracked ---");
const tracked = run("git ls-files node_modules");
if (tracked.trim()) {
  console.log("node_modules IS tracked in git. Removing...");
  run("git rm -r --cached node_modules");
  run('git commit -m "fix: remove node_modules from git tracking"');
} else {
  console.log("node_modules is NOT tracked. Good.");
}

// Push the current branch
console.log("\n--- Pushing to GitHub ---");
run("git push origin HEAD");

console.log("\nDone! Check Vercel dashboard for deployment status.");
