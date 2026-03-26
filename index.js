/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";

import BackgroundFetch from "react-native-background-fetch";
import ReactNativeForegroundService from "@supersami/rn-foreground-service";
import { backgroundFetchHeadlessTask } from "./src/services/EmployeeService/backgroundLocationService";

// Foreground service must be registered once for headless/background task execution.
ReactNativeForegroundService.register();

// ✅ REQUIRED FOR KILLED STATE
BackgroundFetch.registerHeadlessTask(backgroundFetchHeadlessTask);

AppRegistry.registerComponent(appName, () => App);