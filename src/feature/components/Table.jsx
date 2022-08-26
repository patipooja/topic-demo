import Paper from "@mui/material/Paper";
import { Table as MuiTable } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Constants } from "../../utils/constants";

const getTableData = (row, columns, getCellValue) => {
  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
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
};

const getNoDataRow = () => {
  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={-1}>
      <TableCell colSpan="4" align="center">
        {Constants.NO_DATA}
      </TableCell>
    </TableRow>
  );
};

const getTableColumns = (columns) => {
  return (
    <TableRow>
      {columns &&
        columns.map((column) => (
          <TableCell
            key={column.id}
            align={column.align}
            style={{ minWidth: column.minWidth }}
          >
            {column.label}
          </TableCell>
        ))}
    </TableRow>
  );
};

const Table = (props) => {
  return (
    <Paper sx={{ overflow: "hidden", margin: 5 }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <MuiTable stickyHeader aria-label="sticky table">
          <TableHead>{getTableColumns(props.columns)}</TableHead>
          <TableBody>
            {props.data && props.data.length > 0
              ? props.data.map((row) =>
                  getTableData(row, props.columns, props.getCellValue)
                )
              : getNoDataRow()}
          </TableBody>
        </MuiTable>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={props.totalCount}
        rowsPerPage={props.rowsPerPage}
        page={props.page}
        onPageChange={props.handleChangePage}
        onRowsPerPageChange={props.handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default Table;
