import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const ImageLister = ({ itemData, width , height, variant, cols, rowHeight}) => {

  return (
    <ImageList
      sx={{ width: width, height: height }}
      variant={variant}
      cols={cols}
      rowHeight={rowHeight}
    >
      {itemData.map((item) => (
        <ImageListItem key={item.id} cols={item.cols || 1} rows={item.rows || 1}>
          <img
            {...srcset(item.img_src, rowHeight, item.rows, item.cols)}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

export default ImageLister;