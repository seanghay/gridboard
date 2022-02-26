import { defineBuildConfig } from 'unbuild';


export default defineBuildConfig({
  entries: [
    "src/main"
  ],
  declaration: true,
  rollup: { 
    emitCJS: true,
  },
  clean: true,
})