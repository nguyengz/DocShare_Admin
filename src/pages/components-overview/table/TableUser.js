import React, { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TableCell, TextField, Tooltip } from '@mui/material';
// import { Delete, Edit } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { makeStyles } from '../../../../node_modules/@mui/styles/index';
import { Switch } from '@mui/material';
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
  //   const [createModalOpen, setCreateModalOpen] = useState(false);
  const classes = useStyles();
  const [tableData, setTableData] = useState([]);

  const [showDialog, setShowDialog] = useState(false);
  const [dialogData, setDialogData] = useState({});
  const [inputValue, setInputValue] = useState('');
  const [initialEnabledState, setInitialEnabledState] = useState(false);
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
  const handleToggleEnabled = (row) => {
    setDialogData(row); // store the row data in state
    setShowDialog(true); // show the dialog box
    setInputValue(row.original?.disabledReason || ''); // set input value to the current disabled reason or empty string
    // save the initial input value
    setInitialEnabledState(row.original?.enabled || false); // save the initial enabled state
  };

  const handleDialogClose = () => {
    setShowDialog(false); // hide the dialog box
    setInputValue(null); // reset input value to initial value
    setTableData(
      tableData.map((user) =>
        user.id === dialogData.original.id
          ? {
              ...user,
              enabled: initialEnabledState
            }
          : user
      )
    ); // reset switch value to initial value
  };

  const handleDialogSubmit = (newEnabledState) => {
    const updatedTableData = tableData.map((user) => {
      if (user.id === dialogData.original.id) {
        return {
          ...user,
          enabled: newEnabledState,
          disabledReason: !newEnabledState ? inputValue : null
        };
      } else {
        return user;
      }
    });
    setTableData(updatedTableData);
    setShowDialog(false); // hide the dialog box
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
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}
        >
          <img alt="avatar" height={30} src={row.avatar} loading="lazy" style={{ borderRadius: '50%' }} />
          {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
        </Box>
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
              <Switch defaultChecked={row.original?.enabled} onChange={() => handleToggleEnabled(row)} />
            </Tooltip>
          </Box>
        )}
      />
      <Dialog open={showDialog} onClose={handleDialogClose}>
        <DialogTitle>{dialogData.original?.enabled ? 'Disable' : 'Enable'} User</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to {dialogData.original?.enabled ? 'disable' : 'enable'} the user?</p>
          <TextField
            label="Reason for disabling"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={() => handleDialogSubmit(!dialogData.original?.enabled)} variant="contained">
            {dialogData.original?.enabled ? 'Disable' : 'Enable'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Table;
