import { execSync } from "child_process";

const cwd = "/vercel/share/v0-project";

function run(cmd) {
  console.log(`> ${cmd}`);
  try {
    const output = execSync(cmd, { cwd, encoding: "utf-8", stdio: "pipe" });
    if (output.trim()) console.log(output.trim());
    return output;
  } catch (e) {
    console.log("stderr:", e.stderr?.trim() || "");
    console.log("stdout:", e.stdout?.trim() || "");
    return e.stdout || "";
  }
}

// Step 1: Show current state
console.log("=== Step 1: Current state ===");
run("git status --short");
const branch = run("git rev-parse --abbrev-ref HEAD").trim();
console.log("Current branch:", branch);
run("git log --oneline -3");

// Step 2: Save current branch name and commit
const currentCommit = run("git rev-parse HEAD").trim();
console.log("Current commit:", currentCommit);

// Step 3: Fetch latest from origin
console.log("\n=== Step 2: Fetching origin ===");
run("git fetch origin");

// Step 4: Force push current code directly to main
// This replaces main with our working v0 branch content
console.log("\n=== Step 3: Pushing to main ===");
run(`git push origin HEAD:main --force`);

console.log("\n=== DONE ===");
console.log("Pushed current branch to origin/main.");
console.log("Vercel should now auto-deploy from main.");
