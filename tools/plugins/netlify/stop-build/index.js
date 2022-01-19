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
  const getAffected = `nx affected:apps --base=${lastDeployedCommit} --head=HEAD --plain`;
  const npmOutput = execSync(getAffected, { encoding: "utf8" });
  console.log(npmOutput.toString() + "  build stop script npm output");
  //filter out new lines \n
  const filteredArray = npmOutput.split(/\r\n|\r|\n/);

  //convert project names to array
  const affectedProjects = filteredArray[0].split(" ");
  console.log(affectedProjects, "affected projects array");
  //if netlify app name is the same as affected app name, return true
  const foundChangedProject =
    affectedProjects.findIndex((project) => project === projectName) > -1;
  return foundChangedProject;
}

/* function projectChanged(){
  const getAffected = `nx affected:apps --base=porting-senf --head=HEAD`;
} */
