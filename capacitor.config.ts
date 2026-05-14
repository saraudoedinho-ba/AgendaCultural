import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'br.com.agendacultural',
  appName: 'Agenda Cultural',
  webDir: 'dist/agenda_cultural/browser',
  server: {
    cleartext: true,
    androidScheme: 'http'
  }
};

export default config;
