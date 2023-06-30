import React, { useEffect, useState } from 'react';
import { Box, Button, Link, Stack, Typography } from '@mui/material';

function TagList({ userAbout }) {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    handleListTags();
    // call handleListTags to get list of tags
  }, [userAbout]);

  const handleListTags = () => {
    if (userAbout && userAbout.files) {
      const tagsSet = new Set();
      userAbout.files.forEach((file) => {
        if (file.tags) {
          file.tags.forEach((tag) => {
            tagsSet.add(tag);
          });
        }
      });
      const tagsArr = Array.from(tagsSet);
      setTags(tagsArr);
    }
  };

  return (
    <Stack item>
      <Typography variant="h5" color="initial">
        Tags
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {tags.map((tag, index) => (
          <Button
            key={index}
            component={Link}
            href={`/Search?tagName=${tag.tagName}`}
            sx={{
              border: '1px solid',
              borderRadius: '16px',
              background: '',
              padding: '1px 16px',
              lineHeight: '24px',
              margin: '2px'
            }}
            label={`tag.${tag.tagName}`}
          >
            {tag.tagName}
          </Button>
        ))}
      </Box>
    </Stack>
  );
}

export default TagList;
