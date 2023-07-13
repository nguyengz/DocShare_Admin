import React, { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TableCell, Tooltip } from '@mui/material';
// import { Delete, Edit } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { makeStyles } from '../../../../node_modules/@mui/styles/index';
import { Switch } from '@mui/material';
import { putUserActive } from 'store/reducers/slices/user';
import { useDispatch, useSelector } from 'react-redux';
import randomColor from 'randomcolor';
import Swal from 'sweetalert2';

// import { fetchUser } from '~/slices/user';

// import { useEffect } from 'react';
// import { format } from 'date-fns';
// import moment from 'moment/moment';
const useStyles = makeStyles(() => ({
  circle: {
    display: 'inline-block',
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    marginRight: '5px'
  },
  green: {
    backgroundColor: 'green'
  },
  red: {
    backgroundColor: 'red'
  }
}));

function Table(props) {
  const dispatch = useDispatch();
  //   const [createModalOpen, setCreateModalOpen] = useState(false);
  const classes = useStyles();
  const [tableData, setTableData] = useState([]);
  const requestTime = useSelector((state) => state.user.requestTime);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogData, setDialogData] = useState({});
  // const [updatedTableData, setUpdatedTableData] = useState([]);
  // const [status, setStatus] = useState(props.data?.enabled);
  // const [fileCount, setFileCount] = useState(0);

  useEffect(() => {
    if (tableData) {
      setTableData(props.data);
    }
    // setFileCount(props.data.length); // tính toán số lượng files và cập nhật vào state
  }, [props.data]);
  // const filesCount = props.data.files.length;
  // const handleDeleteFile = (fileId) => {
  //   const updatedTableData = tableData.filter((file) => file.id !== fileId);
  //   setTableData(updatedTableData);
  // };

  const handleToggleActive = (row) => {
    setDialogData(row); // store the row data in state
    setShowDialog(true); // show the dialog box; // save the initial enabled state
  };

  const handleDialogClose = () => {
    setShowDialog(false); // hide the dialog box
  };

  const handleDialogSubmit = (dialogData) => {
    const data = { id: dialogData.id, enabled: !dialogData.enabled };
    console.log(requestTime);
    try {
      dispatch(putUserActive(data));
      Swal.fire({
        title: 'Đang xử lý...',
        timer: 2000 + requestTime,
        timerProgressBar: true, // Hiển thị thanh tiến trình chờ
        didOpen: () => {
          Swal.showLoading(); // Hiển thị icon loading
        }
      });
      const updatedData = tableData.map((row) => {
        if (row.id === dialogData.id) {
          return { ...row, enabled: !row.enabled };
        }
        return row;
      });
      setTableData(updatedData);
      setShowDialog(false);
    } catch (error) {
      console.error(error);
    }
    setShowDialog(false);
  };
  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);
  //   const options = { year: "numeric", month: "short", day: "numeric" };
  //   const formattedDate = date.toLocaleDateString("en-US", options);
  //   return formattedDate;
  // };

  // const formattedDate = formatDate(userAbout?.files.uploadDate);

  //   const formatDate = (dateString) => {
  //     const date = moment.utc(dateString).toDate();
  //     return format(date, 'dd/MM/yyyy HH:mm:ss');
  //   };
  const columnsOrder = ['avatar', 'username', 'email', 'enabled', 'maxUpload', 'files'];

  const columns = useMemo(() => [
    {
      accessorKey: 'avatar',
      header: 'Avatar',
      enableColumnOrdering: false,
      enableEditing: false, //disable editing on this column
      enableSorting: false,
      size: 50,
      Cell: ({ row }) => (
        <Avatar sx={{ bgcolor: randomColor() }} src={row.original?.avatar}>
          {row.original?.username.charAt(0).toUpperCase()}
        </Avatar>
      )
    },
    {
      accessorKey: 'username',
      header: 'Username',
      size: 50,
      Cell: ({ row }) => <Link to={`/AboutUser/${row.original?.id}`}>{row.original?.username}</Link>
    },
    {
      accessorKey: 'email',
      header: 'Email',
      size: 50
    },
    {
      accessorKey: 'enabled',
      header: 'Enabled',
      size: 50,
      Cell: ({ row }) => (
        <TableCell>
          <span className={`${classes.circle} ${row?.original?.enabled ? classes.green : classes.red}`} />
          {row.original?.enabled ? 'Enabled' : 'Disabled'}
        </TableCell>
      )
    },
    // {
    //   accessorKey: 'files',
    //   header: 'Files',
    //   size: 50,
    //   enableSorting: true,
    //   // Cell: ({ cell }) => cell.value?.length,
    //   muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
    //     ...getCommonEditTextFieldProps(cell)
    //   })
    // },
    {
      accessorKey: 'maxUpload',
      header: 'maxUpload',
      size: 50,
      enableSorting: true
      // Cell: ({ cell }) => formatDate(cell.value),
    },
    {
      accessorKey: 'files',
      header: 'Files',
      size: 50,
      enableSorting: true,
      Cell: ({ row }) => (row.original?.files ? row.original?.files.length : 0)
    }
  ]);

  return (
    <>
      <MaterialReactTable
        displayColumnDefOptions={{
          'mrt-row-actions': {
            muiTableHeadCellProps: {
              align: 'center'
            },
            muiTableBodyCellStyle: {
              paddingRight: '10px',
              display: 'flex',
              justifyContent: 'flex-end'
            },
            size: 120
          }
        }}
        data={tableData}
        columns={columns}
        columnsOrder={columnsOrder}
        enableEditing
        enableColumnOrdering
        renderRowActions={({ row }) => (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Tooltip arrow placement="right" title={row.original.enabled ? 'Disable' : 'Enable'}>
              <Switch checked={row.original?.enabled} onChange={() => handleToggleActive(row.original)} />
            </Tooltip>
          </Box>
        )}
      />
      <Dialog open={showDialog} onClose={handleDialogClose}>
        <DialogTitle>{dialogData.original?.enabled ? 'Disable' : 'Enable'} User</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to {dialogData.original?.enabled ? 'disable' : 'enable'} the user?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={() => handleDialogSubmit(dialogData)} variant="contained">
            {dialogData.original?.enabled ? 'Disable' : 'Enable'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Table;
