import { pluginSvgr } from '@rsbuild/plugin-svgr';
import { pluginReact } from '@rsbuild/plugin-react';
import { loadEnv } from '@rsbuild/core';

const { publicVars } = loadEnv({ prefixes: ['REACT_APP_'] });

const environments = Object.entries(publicVars).reduce((acc, [key, value]) => {
  const updatedKey = key.replace(/REACT_APP_/, '');
  acc[updatedKey] = value;
  return acc;
}, {});

export default {
  source: {
    define: environments,
  },
  plugins: [pluginReact(), pluginSvgr()],
  html: {
    template: './public/index.html',
  },
  output: {
    distPath: {
      root: 'build',
    },
    assetPrefix: './',
  },
  dev: {
    assetPrefix: '/public/assets/',
  },
  server: {
    base: '/',
  },
};
