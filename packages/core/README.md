
# Grid Board

A library for building Grid & Spans on Canvas

[![ci](https://github.com/seanghay/gridboard/actions/workflows/ci.yml/badge.svg)](https://github.com/seanghay/gridboard/actions/workflows/ci.yml)
[![Release](https://github.com/seanghay/gridboard/actions/workflows/release.yml/badge.svg)](https://github.com/seanghay/gridboard/actions/workflows/release.yml)

<img src="https://user-images.githubusercontent.com/15277233/155681801-1b7142dd-e147-471c-9388-b18fa51b60c9.png" width=600>

## Installation

```sh
# npm
npm i @gridboard/core

# pnpm
pnpm i @gridboard/core

# Yarn
yarn add @gridboard/core
```

### Browser

```html
<script type="module">
import { renderGrid } from 'https://unpkg.com/@gridboard/core@0.0.8/dist/main.mjs?module';
</script>
```

## Usage

[See example](https://github.com/seanghay/gridboard/tree/main/packages/web)

```js
renderGrid(ctx, {
    width,
    height,
    gapSize: state.gridGap,
    gapEdge: false,
    spans: state.spans,
    rowSize: state.gridRowSize,
    columnSize: state.gridColumnSize,
    render({
      row, column,
      cellHeight,
      cellWidth,
      position,
      estimatedHeight,
      estimatedWidth,
      x,
      y
    }) {
      ctx.fillStyle = '#eee';
      ctx.fillRect(
        x,
        y,
        cellWidth,
        cellHeight
      );
    }
  });
  ```
  
## Spans

Spans look like this `0:4!0:5, 0:4!4:4` where `row:columnSpanSize!column:rowSpanSize` separated by commas `,`


## License

MIT
