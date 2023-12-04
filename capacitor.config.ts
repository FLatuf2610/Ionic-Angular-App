import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.places',
  appName: 'Discover Places',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
