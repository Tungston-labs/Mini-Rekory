import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";

import BackgroundFetch from "react-native-background-fetch";
import { sendImmediateLocation } from "./src/services/EmployeeService/trackingService";

const HeadlessTask = async (event) => {
  console.log("🔥 HEADLESS RUN:", event.taskId);

  try {
    await sendImmediateLocation();
  } catch (e) {
    console.log("HEADLESS ERROR:", e);
  }

  BackgroundFetch.finish(event.taskId);
};

BackgroundFetch.registerHeadlessTask(HeadlessTask);

AppRegistry.registerComponent(appName, () => App);