// /** @format */

// export const loadStateCreateProjectData = () => {
//   try {
//     const serializedState = localStorage.getItem("createProjectData");
//     if (serializedState === null) {
//       return undefined;
//     }
//     return JSON.parse(serializedState);
//   } catch (err) {
//     return undefined;
//   }
// };

// export const saveStateCreateProjectData = (state) => {
//   try {
//     const serializedState = JSON.stringify(state);
//     localStorage.setItem("createProjectData", serializedState);
//   } catch (err) {
//     // Ignore write errors.
//   }
// };
