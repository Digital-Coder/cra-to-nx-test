const { basename } = require("path");

module.exports = {
  onPreBuild: ({ utils, constants }) => {
    const projectName =
      process.env.PROJECT_NAME || basename(constants.PUBLISH_DIR);
    const lastDeployedCommit = process.env.CACHED_COMMIT_REF;
    //const latestCommit = "HEAD";
    const projectHasChanged = projectChanged(projectName, lastDeployedCommit);
    if (!projectHasChanged) {
      utils.build.cancelBuild(
        `Build was cancelled because ${projectName} was not affected by the latest changes`
      );
    }
  },
};

function projectChanged(projectName, lastDeployedCommit) {
  const execSync = require("child_process").execSync;
  const getAffected = `nx affected:apps --base=main --head=${lastDeployedCommit} --plain`;
  const npmOutput = execSync(getAffected, { encoding: "utf8" });
  console.log(npmOutput.toString() + " npm output");
  //filter out new lines \n
  const filteredArray = npmOutput.split(/\r\n|\r|\n/);
  console.log(filteredArray, "filtered   npm output array");
  //convert project names to array
  const affectedProjects = filteredArray[4].split(" ");
  //if netlify app name is the same as affected app name, return true
  const foundChangedProject =
    affectedProjects.findIndex((project) => project === projectName) > -1;

  console.log("Found git changes in these projects: " + affectedProjects);
}

/* function projectChanged(){
  const getAffected = `nx affected:apps --base=porting-senf --head=HEAD`;
} */
