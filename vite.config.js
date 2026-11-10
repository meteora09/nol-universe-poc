import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const apiKey = env.VITE_AMPLITUDE_API_KEY || '';
  const webExperimentEnabled = env.VITE_AMPLITUDE_ENABLED === 'true' && /^[a-f0-9]{32}$/i.test(apiKey);
  return {
    plugins: [{
      name: 'amplitude-web-experiment',
      transformIndexHtml() {
        if (!webExperimentEnabled) return [];
        return [{tag: 'script', attrs: {src: `https://cdn.amplitude.com/script/${apiKey}.experiment.js`}, injectTo: 'head-prepend'}];
      },
    }],
  };
});
