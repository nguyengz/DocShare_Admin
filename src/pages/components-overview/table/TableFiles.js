import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Tooltip } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
// import { Delete, Edit } from '@mui/icons-material';

// import { fetchUser } from '~/slices/user';

// import { format } from 'date-fns';
// import moment from 'moment/moment';

const TableFiles = (props) => {
  //   const [createModalOpen, setCreateModalOpen] = useState(false);

  const [tableData, setTableData] = useState([]);

  const [validationErrors, setValidationErrors] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [message, setMessage] = useState('');
  // const [fileCount, setFileCount] = useState(0);
  useEffect(() => {
    if (tableData) {
      setTableData(props.data);
    }
    // setFileCount(props.data.length); // tính toán số lượng files và cập nhật vào state
  }, [props.data, tableData]);
  // const filesCount = props.data.files.length;
  const handleDeleteFile = (fileId) => {
    const updatedTableData = tableData.filter((file) => file.id !== fileId);
    setTableData(updatedTableData);
  };
  const handleConfirmDelete = (file) => {
    const confirmed = window.confirm(`Are you sure you want to delete the file ${file.fileName}?`);
    if (confirmed) {
      handleDeleteFile(file.id);
    }
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);
  //   const options = { year: "numeric", month: "short", day: "numeric" };
  //   const formattedDate = date.toLocaleDateString("en-US", options);
  //   return formattedDate;
  // };

  // const formattedDate = formatDate(userAbout?.files.uploadDate);

  const getCommonEditTextFieldProps = useCallback(
    (cell) => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid =
            cell.column.id === 'email'
              ? validateEmail(event.target.value)
              : cell.column.id === 'age'
              ? validateAge(+event.target.value)
              : validateRequired(event.target.value);
          if (!isValid) {
            //set validation error for cell if invalid
            setValidationErrors({
              ...validationErrors,
              [cell.id]: `${cell.column.columnDef.header} is required`
            });
          } else {
            //remove validation error for cell if valid
            delete validationErrors[cell.id];
            setValidationErrors({
              ...validationErrors
            });
          }
        }
      };
    },
    [validationErrors]
  );

  //   const formatDate = (dateString) => {
  //     const date = moment.utc(dateString).toDate();
  //     return format(date, 'dd/MM/yyyy HH:mm:ss');
  //   };
  const columnsOrder = ['fileName', 'userName', 'category', 'uploadDate', 'view', 'likeFile', 'repostCount', 'tags'];
  const columns = useMemo(
    () => [
      {
        accessorKey: 'fileName',
        header: 'FileName',
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 150,
        Cell: ({ row }) => (
          <Link to={`/fileDetail/${row.original?.id}`} target="_blank">
            {row.original?.fileName}
          </Link>
        )
      },
      {
        accessorKey: 'userName',
        header: 'Username',
        size: 50,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell)
        })
      },
      {
        accessorKey: 'category',
        header: 'Category',
        size: 50,
        Cell: ({ cell }) => cell.row.original.category && cell.row.original.category.categoryName,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell)
        })
      },
      {
        accessorKey: 'uploadDate',
        header: 'UploadDate',
        size: 50,
        width: '20%',
        // Cell: ({ cell }) => formatDate(cell.value),
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell)
        })
      },
      {
        accessorKey: 'view',
        header: 'View',
        size: 50,
        width: '20%',
        enableSorting: true,
        // Cell: ({ cell }) => cell.value?.length,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell)
        })
      },
      {
        accessorKey: 'likeFile',
        header: 'Like',
        size: 50,
        width: '20%',
        enableSorting: true,
        // Cell: ({ cell }) => formatDate(cell.value),
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell)
        })
      },
      {
        accessorKey: 'repostCount',
        header: 'Reported',
        size: 50,
        width: '20%',
        enableSorting: true,
        // Cell: ({ cell }) => formatDate(cell.value),
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell)
        })
      },
      {
        accessorKey: 'tags',
        header: 'Tags',
        size: 50,
        enableSorting: true,
        Cell: ({ cell }) => cell.row.original.tags.map((tag) => tag.tagName).join(', '),
        // Use optional chaining operator and default value of 0
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell)
        })
      }
    ],
    [getCommonEditTextFieldProps]
  );

  return (
    <>
      <MaterialReactTable
        sx={{
          maxWidth: '1000px',
          overflowY: 'auto'
        }}
        displayColumnDefOptions={{
          'mrt-row-actions': {
            muiTableHeadCellProps: {
              align: 'center'
            },
            size: 10
          }
        }}
        data={tableData}
        columns={columns}
        columnsOrder={columnsOrder}
        enableEditing
        enableColumnOrdering
        renderRowActions={({ row }) => (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Tooltip arrow placement="right" title="SendMessage">
              <IconButton color="primary" onClick={handleOpenDialog}>
                <SendIcon />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => handleConfirmDelete(row.original)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      />
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>Send Message</DialogTitle>
        <DialogContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // handle sending message to server
              handleCloseDialog();
            }}
          >
            <TextField
              autoFocus
              margin="dense"
              label="Violate"
              type="text"
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Message"
              type="text"
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button type="submit" color="primary">
                Send
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      <style>
        {`
         .table-files table {
          max-height: 400px;
          overflow-y: auto;
        }
        tr > td:{
          max-width: 50px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        tr > td:nth-child(2) {
          max-width: 300px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
       
      `}
      </style>
    </>
  );
};

export default TableFiles;
