
# Grid Board

A library for building Grid & Spans on Canvas

[![ci](https://github.com/seanghay/gridboard/actions/workflows/ci.yml/badge.svg)](https://github.com/seanghay/gridboard/actions/workflows/ci.yml)


## Installation

```sh
# npm
npm i @gridboard/core

# pnpm
pnpm i @gridboard/core

# Yarn
yarn add @gridboard/core
```


## Usage

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
      estimatedWidth
    }) {
      const image = imageAt(position);
      if (!image) {
        ctx.save();
        ctx.fillStyle = '#eee';
        ctx.fillRect(
          estimatedWidth * column,
          estimatedHeight * row,
          cellWidth,
          cellHeight
        );
        ctx.restore();
        return;
      };
      drawImageCell(
        ctx,
        image,
        cellWidth,
        cellHeight,
        estimatedWidth,
        estimatedHeight,
        column,
        row
      );
    }
  });
  
  ```



## License

MIT
