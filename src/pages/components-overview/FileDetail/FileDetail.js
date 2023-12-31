import React, { useEffect, useState } from 'react';
import { Grid, Stack, Typography, Button, Avatar, CircularProgress, Link } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import 'swiper/swiper.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';

import { useDispatch, useSelector } from 'react-redux';
import { fetchFileDetail } from 'store/reducers/slices/file';
import { pdfjs } from 'react-pdf';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1px',
    height: '100%'
  },
  imageWrapper: {
    margin: 'auto',
    display: 'block',
    width: '100%',
    height: '100%',
    border: '1px solid rgba(0,0,0,0.15)',
    // borderRadius: "1px",
    boxShadow: '5px 5px 5px 5px rgba(0,0,0,0.25)',
    padding: '0',
    overflowX: 'hidden',
    background: 'gainsboro',
    /* width: 100px; */
    objectfit: 'cover'
  }
};
function FileDetail() {
  const dispatch = useDispatch();

  const { id } = useParams();
  // const { state } = window.history;

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [images, setImages] = useState([]);
  // const [pdf, setPdf] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // const [showPricing, setShowPricing] = useState(false);
  // const [showPricing, setShowPricing] = useState(false);

  const fileDetail = useSelector((state) => state.file.detailList);
  const uploadDate = new Date(fileDetail.uploadDate);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const formattedDate = uploadDate.toLocaleDateString('en-US', options);

  // const [error, setError] = useState(null);
  // const options = { year: 'numeric', month: 'short', day: 'numeric' };
  // const formattedDate = uploadDate.toLocaleDateString('en-US', options);
  const tags = fileDetail.tags;
  // const link = state.link;
  // const file_id = id;
  useEffect(() => {
    dispatch(fetchFileDetail(id));
  }, [dispatch, id]);

  async function renderPage(pdfUrl) {
    setIsLoading(true);
    const _pdf = await pdfjs.getDocument(pdfUrl).promise;
    const imagesList = [];
    const canvas = document.createElement('canvas');
    canvas.className = 'canv';
    const context = canvas.getContext('2d');

    for (let i = 1; i <= _pdf.numPages; i++) {
      const page = await _pdf.getPage(i);
      const viewport = page.getViewport({ scale: 1 });
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      setWidth(viewport.width);
      setHeight(viewport.height);
      const renderContext = { canvasContext: context, viewport };
      await page.render(renderContext).promise;
      const img = canvas.toDataURL('image/png');
      imagesList.push(img);
    }
    setImages(imagesList);
    setIsLoading(false);
  }

  useEffect(() => {
    if (fileDetail.link) {
      const pdfUrl = `http://localhost:8080/file/review/${fileDetail.link}`;
      renderPage(pdfUrl);
    }
  }, [fileDetail.link]);

  return (
    <>
      <Grid
        container
        sm={10}
        direction="row"
        pt={1}
        justifyContent="center"
        sx={{
          margin: 'auto',
          boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
        }}
        rowSpacing={4.5}
        columnSpacing={2.75}
      >
        <Grid xs={12} md={10} direction="column">
          <Grid
            item
            sx={{
              height: 400,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)'
            }}
          >
            {isLoading ? (
              <CircularProgress /> // show CircularProgress when isLoading is true
            ) : images && images.length > 0 ? (
              <Swiper
                pagination={{
                  type: 'progressbar'
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
                style={styles.wrapper}
              >
                {images.map((image, idx) => (
                  <SwiperSlide key={idx} style={styles.imageWrapper}>
                    <img
                      id="image-generated"
                      src={image}
                      alt="pdfImage"
                      style={{
                        display: 'block',
                        width: width,
                        height: height,
                        border: '2px ridge  ',
                        margin: '5px auto',
                        boxShadow: '0px 4px 5px 5px rgb(194 219 246)'
                      }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <Typography variant="h1" color="initial">
                None
              </Typography>
            )}
          </Grid>
          <Grid
            xs={12}
            sm={8}
            item
            mt={1}
            sx={{
              height: 300
            }}
            spacing={4}
          >
            <Stack sm={8} direction="row" spacing={1} justifyContent="space-between">
              <Stack sm={4} item sx={{ marginLeft: '5px' }}>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: '26px',
                    fontWeight: 150,
                    wordWrap: 'break-word'
                  }}
                >
                  {fileDetail?.fileName > 100 ? fileDetail?.fileName.slice(0, 100) + '...' : fileDetail?.fileName}
                </Typography>
                <Typography variant="caption" sx={{ fontSize: '15px', marginLeft: '5px' }}>
                  {formattedDate} • {fileDetail?.likeFile} likes • {fileDetail?.view} views
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row" spacing={2} sx={{ margin: '10px' }}>
              <Typography variant="caption" sx={{ fontSize: '15px' }}>
                {fileDetail?.fileType}
              </Typography>

              <br />
            </Stack>
            <Stack direction="row" spacing={2} sx={{ margin: '10px' }}>
              <Typography variant="caption" sx={{ fontSize: '15px' }}>
                {fileDetail?.category?.categoryName}
              </Typography>
              <br />
            </Stack>

            <Stack direction="row" spacing={2} sx={{ margin: '10px' }}>
              {tags &&
                tags.map((tag, index) => (
                  <Button
                    key={index}
                    sx={{
                      border: '1px solid',
                      borderRadius: '56px',
                      background: '',
                      padding: '0 16px',
                      lineHeight: '24px'
                    }}
                    label={tag.tagName}
                  >
                    {tag.tagName}
                  </Button>
                ))}
            </Stack>
            <Stack direction="row" spacing={2}>
              <Typography sx={{ margin: '10px' }}>{fileDetail?.description}</Typography>
            </Stack>
            <Stack direction="row" spacing={2} sx={{ margin: '10px 10px' }}>
              <Stack item>
                {' '}
                <Avatar
                  sx={{
                    width: '50px',
                    height: '50px'
                  }}
                ></Avatar>
              </Stack>
              <Stack item>
                <Typography
                  component={Link}
                  style={{
                    fontSize: '20px',
                    marginRight: 'auto',
                    textDecoration: 'none',
                    color: '#1976d2'
                  }}
                  onClick={() => {
                    // setidlink(page.id);
                    // alert(page.title);
                  }}
                  href={`/About/${fileDetail?.userId}`}
                  key={fileDetail?.userId}
                  onMouseEnter={(e) => {
                    e.target.style.color = 'blue';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '1976d2';
                  }}
                >
                  {fileDetail?.userName}
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default FileDetail;
