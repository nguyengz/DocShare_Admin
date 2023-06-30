import React, { useState } from 'react';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Pagination, Navigation } from 'swiper';
import 'swiper/swiper.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';
const style = {
  todoName: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '200px'
  },
  girdCard: {
    width: '200px',
    height: '200px'
  },
  imageWrapper: {
    display: 'grid',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    padding: '0',
    overflowX: 'hidden'
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1px'
  }
};

function FileList(props) {
  const [matches] = useState(false);
  const number = [4, 2];

  const options = { year: 'numeric', month: 'short', day: 'numeric' };

  // Add a null check before calling the slice method
  const result = props.file?.slice(0, number[2])?.map((todo) => {
    const uploadDate = new Date(todo.uploadDate);
    const formattedDate = uploadDate.toLocaleDateString('en-US', options);

    return (
      <Grid item xs={matches ? number[0] : number[1]} key={todo.id} padding={1}>
        <Card
          elevation={0}
          sx={{
            border: '1px solid',
            width: '200px'
          }}
        >
          <CardActionArea sx={{ height: '100%' }} onClick={() => props.handleClickFile(todo)}>
            <CardMedia
              component="img"
              image={props.imageData[todo.id] || ''}
              alt="green iguana"
              height={200}
              sx={{
                objectFit: 'contain',
                objectPosition: 'none'
                // border: "1px solid black",
              }}
            />
            <CardContent sx={{ height: '50px' }}>
              <Typography style={style.todoName} gutterBottom variant="body2">
                {todo.fileName.length > 50 ? todo.fileName.slice(0, 50) + '...' : todo.fileName}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions
            style={{
              display: 'flex',
              margin: '0px 1px',
              justifyContent: 'space-between'
            }}
          >
            <Typography variant="caption">{todo.view} views</Typography>
            <Typography variant="caption">{formattedDate}</Typography>
          </CardActions>
        </Card>
      </Grid>
    );
  });

  return (
    <>
      <Swiper
        // pagination={{
        //   type: "progressbar",
        // }}
        slidesPerView={4}
        slidesPerGroup={4}
        navigation={true}
        modules={[Pagination, Navigation]}
        style={style.wrapper}
      >
        {result?.map((item, idx) => (
          <SwiperSlide key={idx} style={style.imageWrapper}>
            {item}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default FileList;
