import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useLocation } from 'react-router-dom';
import { useGetTopics } from '../graphql/topics/hooks';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import { Constants } from '../utils/constants';
import Chip from '@mui/material/Chip';
import Stars from '@mui/icons-material/Stars';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const ClickableChips = ({ relatedTopics, navigate }) => {
  const handleClick = (name) => {
    navigate(`/topics/${name}`, { state: { topic: name } });
  };

  return (
    <Card sx={{ margin: 5 }}>
      <Typography variant="h5" component="div" sx={{ margin: 3 }}>
        Related Topics:
      </Typography>
      <Stack direction="row" spacing={1} sx={{ margin: 3 }}>
        {relatedTopics.map((row, index) => {
          return (
            <Chip
              key={index}
              color="primary"
              label={`${row.stargazerCount} | ${row.name}`}
              onClick={() => {
                handleClick(row.name);
              }}
              icon={<Stars />}
              variant="outlined"
            />
          );
        })}
      </Stack>
    </Card>
  );
};

const CircularIndeterminate = (loading) => {
  return (
    <Backdrop
      sx={{ color: 'secondary', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

const columns = [
  { id: 'name', label: 'Name' },
  {
    id: 'resourcePath',
    label: 'Resource Path',
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'stargazerCount',
    label: 'Stargazer count',
    minWidth: 50,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
];

const Topics = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { topics, relatedTopics, loading, totalCount } = useGetTopics(
    location?.state?.topic ?? 'react'
  );
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getCellValue = (column, value) => {
    let cellValue;
    if (column.id === 'stargazerCount') {
      cellValue = <Chip color="secondary" label={value} icon={<Stars />} />;
    } else if (column.id === 'relatedTopics') {
      cellValue = value;
    } else {
      cellValue =
        column.format && typeof value === 'number'
          ? column.format(value)
          : value;
    }
    return cellValue;
  };

  if (loading) return <CircularIndeterminate loading={loading} />;

  return (
    <React.Fragment>
      {relatedTopics && (
        <ClickableChips relatedTopics={relatedTopics} navigate={navigate} />
      )}
      <Paper sx={{ overflow: 'hidden', margin: 5 }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {topics.length > 0 ? (
                topics.map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.name}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {getCellValue(column, value)}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })
              ) : (
                <TableRow hover role="checkbox" tabIndex={-1} key={-1}>
                  <TableCell colSpan="4" align="center">
                    {Constants.NO_DATA}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </React.Fragment>
  );
};

export default Topics;
