import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'coco-intranet',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    "PushNotifications": {
      presentationOptions: ["alert", "badge", "sound"]
    }
  }
};

export default config;
