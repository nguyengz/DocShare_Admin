import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Box, Grid, Link, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AccountCircle } from '@mui/icons-material';

import { fetchUserAbout } from 'store/reducers/slices/user';
import TagList from '../ListComponent/TagList';
import FileList from '../ListComponent/FileList';

const Item = styled(Grid)(({ theme }) => ({
  margin: 2,
  textAlign: 'left',
  color: theme.palette.text.secondary,
  flexDirection: 'column',

  sx: {
    '&:hover': {
      color: 'blue'
    },
    '&:hover a': {
      color: 'blue'
    }
  }
}));

const style = {
  largeAvatar: {
    width: '100px',
    height: '100px',
    fontSize: '50px'
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
    <Box sx={{ minHeight: '1000px', margin: '1px', background: 'white' }}>
      <Grid container sm={10} spacing={2} direction="column" style={style.gridUser}>
        <Grid item md={6} spacing={2} gap={1}>
          <Stack direction="row">
            <Stack item>
              <Item>
                <Avatar style={style.largeAvatar}>
                  <AccountCircle />
                </Avatar>
              </Item>
            </Stack>
            <Stack item sx={{ marginLeft: '10px' }}>
              <Item>
                <Typography variant="h5">{userAbout?.username}</Typography>
              </Item>
              <Item>
                <Typography>Username:</Typography>
              </Item>
              <Item>
                <Typography>Email:</Typography>
              </Item>
              <Item>
                <Typography>Phone:</Typography>
              </Item>
              <Item>
                <Typography>Facebook</Typography>
              </Item>
            </Stack>
            <Stack item sx={{ marginLeft: '150px' }}>
              <Item>
                <Typography variant="h5" hidden>
                  {userAbout?.username}
                </Typography>
              </Item>
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
            <Stack item sx={{ marginLeft: '150px' }}>
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
          <Stack item>
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
