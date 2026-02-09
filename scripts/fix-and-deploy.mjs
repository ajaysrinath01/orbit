import { execSync } from "child_process";

function run(cmd) {
  console.log(`[v0] Running: ${cmd}`);
  try {
    const output = execSync(cmd, { cwd: "/vercel/share/v0-project", encoding: "utf-8", stdio: "pipe" });
    if (output.trim()) console.log(output.trim());
    return output;
  } catch (e) {
    console.log(`[v0] Command output: ${e.stdout || ""}`);
    console.log(`[v0] Command error: ${e.stderr || e.message}`);
    return null;
  }
}

// Step 1: Check current git status
console.log("\n=== Step 1: Git Status ===");
run("git status");
run("git branch -a");

// Step 2: Remove node_modules from git tracking if it exists
console.log("\n=== Step 2: Remove node_modules from git tracking ===");
run("git rm --cached -r node_modules 2>/dev/null || true");
run("git rm --cached node_modules 2>/dev/null || true");

// Step 3: Check if there's anything to commit
console.log("\n=== Step 3: Commit cleanup if needed ===");
const status = run("git status --porcelain");
if (status && status.trim()) {
  run('git add .gitignore');
  run('git commit -m "fix: remove node_modules from git tracking" --allow-empty');
  console.log("[v0] Committed cleanup changes");
} else {
  console.log("[v0] No cleanup needed on this branch");
}

// Step 4: Push current branch
console.log("\n=== Step 4: Push current branch ===");
run("git push origin HEAD");

console.log("\n=== Done ===");
console.log("[v0] Branch pushed. Vercel should auto-deploy from the connected branch.");
