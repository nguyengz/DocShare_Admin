import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Box, Grid, Link, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { fetchUserAbout } from 'store/reducers/slices/user';
import TagList from '../ListComponent/TagList';
import FileList from '../ListComponent/FileList';
import randomColor from 'randomcolor';

const Item = styled(Grid)(() => ({
  margin: 2,
  textAlign: 'left',
  color: 'GrayText',
  flexDirection: 'column'
}));

const style = {
  largeAvatar: {
    width: '100px',
    height: '100px',
    fontSize: '50px',
    objectFit: 'cover',
    background: randomColor()
  },
  gridUser: {
    margin: 'auto',
    padding: '5px'
  },
  todoName: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '200px'
  },
  girdCard: {
    width: '200px',
    height: '200px'
  }
};

function AboutUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  let userAbout = useSelector((state) => state.user.userAbout);
  const [imageData, setImageData] = useState('');
  const firstLetter = userAbout?.username.charAt(0);
  useEffect(() => {
    console.log(id);
    dispatch(fetchUserAbout(id)).then((response) => {
      console.log(response); // log the fetched user data
    });
  }, [dispatch, id]);
  useEffect(() => {
    if (userAbout && userAbout.files) {
      // add a check for userAbout and userAbout.files
      userAbout.files.forEach((todo) => {
        fetch(`http://localhost:8080/file/review/${todo.linkImg}`)
          .then((response) => response.arrayBuffer())
          .then((buffer) =>
            setImageData((prevImageData) => ({
              ...prevImageData,
              [todo.id]: `data:image/jpeg;base64,${btoa(
                new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
              )}`
            }))
          );
      });
    }
  }, [userAbout]);

  const handleClickFile = (todo) => {
    navigate(`/fileDetail/${todo.id}`);
  };
  return (
    <Box sx={{ minHeight: '1000px', margin: '1px', background: '#f2f2f2', boxShadow: 'rgba(3, 102, 214, 0.3) 0px 0px 0px 3px' }}>
      <Grid container sm={10} spacing={2} direction="column" style={style.gridUser}>
        <Grid item md={6} spacing={2} gap={1} mt={2}>
          <Stack direction="row" sx={{ flex: 2, alignItems: 'center' }}>
            <Stack item>
              <Item>
                <Avatar style={style.largeAvatar} src={userAbout?.avatar}>
                  {' '}
                  {firstLetter}
                  {/* <AccountCircle /> */}
                </Avatar>
              </Item>
            </Stack>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5">{userAbout?.username}</Typography>
              <Stack direction="row" spacing={20}>
                <Stack item ml={1}>
                  <Item>
                    <Typography> Username:{userAbout?.name} </Typography>
                  </Item>
                  <Item>
                    <Typography> Email: {userAbout?.email}</Typography>
                  </Item>
                  <Item>
                    <Typography> Phone: {userAbout?.phone}</Typography>
                  </Item>
                  <Item>
                    <Typography> Social: {userAbout?.linksocial}</Typography>
                  </Item>
                </Stack>
                <Stack item>
                  <Item>
                    <Typography
                      component={Link}
                      onClick={() => {
                        // setidlink(page.id);
                        // alert(page.title);
                      }}
                      href={`/`}
                    >
                      {userAbout?.files.length} DocShare
                    </Typography>
                  </Item>
                  <Item>
                    <Typography
                      component={Link}
                      onClick={() => {
                        // setidlink(page.id);
                        // alert(page.title);
                      }}
                    >
                      {userAbout?.friends.length} Followers
                    </Typography>
                  </Item>
                  <Item>
                    <Typography
                      component={Link}
                      onClick={() => {
                        // setidlink(page.id);
                        // alert(page.title);
                      }}
                    >
                      Followings
                    </Typography>
                  </Item>
                  <Item>
                    <Typography
                      component={Link}
                      onClick={() => {
                        // setidlink(page.id);
                        // alert(page.title);
                      }}
                    >
                      Likes
                    </Typography>
                  </Item>
                </Stack>
                <Stack item>
                  <Item>
                    <Typography
                      component={Link}
                      onClick={() => {
                        // setidlink(page.id);
                        // alert(page.title);
                      }}
                      href={`/`}
                    >
                      {userAbout?.files.length} Oders
                    </Typography>
                  </Item>
                  <Item>
                    <Typography
                      component={Link}
                      onClick={() => {
                        // setidlink(page.id);
                        // alert(page.title);
                      }}
                    >
                      {userAbout?.friends.length} Downloads
                    </Typography>
                  </Item>
                  <Item>
                    <Typography
                      component={Link}
                      onClick={() => {
                        // setidlink(page.id);
                        // alert(page.title);
                      }}
                    >
                      1 Stogre
                    </Typography>
                  </Item>
                  <Item>
                    <Typography
                      component={Link}
                      onClick={() => {
                        // setidlink(page.id);
                        // alert(page.title);
                      }}
                    >
                      Likes
                    </Typography>
                  </Item>
                </Stack>
              </Stack>
            </Box>
          </Stack>
          <Stack item mt={5}>
            <Typography variant="h5" color="initial">
              About:{' '}
            </Typography>
            <Typography variant="body1" color="initial">
              {userAbout?.about}{' '}
            </Typography>
          </Stack>
          <Stack item mt={10}>
            <TagList userAbout={userAbout} />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h2" color="initial" sx={{ fontSize: 20, fontWeight: 700 }}>
            Files ({userAbout?.files.length})
          </Typography>
          <Box sx={{ maxWidth: '1000px', width: '100%', margin: 'auto' }}>
            <FileList file={userAbout?.files} imageData={imageData} handleClickFile={handleClickFile} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AboutUser;
