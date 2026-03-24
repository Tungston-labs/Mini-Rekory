/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import ReactNativeForegroundService from "@supersami/rn-foreground-service";

ReactNativeForegroundService.register({
  id: 144,
  onStart: () => console.log("✅ Service started"),
  onStop: () => console.log("🛑 Service stopped"),
});

AppRegistry.registerComponent(appName, () => App);