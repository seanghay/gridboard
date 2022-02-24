import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: [
    './src/main'
  ],
  rollup: {
    emitCJS: true,
  },
  
  declaration: true,
});