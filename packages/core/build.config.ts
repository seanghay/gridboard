import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: [
    './src/main'
  ],
  rollup: {
    emitCJS: true,
  },
  clean: true,
  declaration: true,
});