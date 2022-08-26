import TablePagination from "@mui/material/TablePagination";

const Pagination = (props) => {
  return (
    <TablePagination
      rowsPerPageOptions={[10]}
      component="div"
      count={props.totalCount}
      rowsPerPage={props.rowsPerPage}
      page={props.page}
      onPageChange={props.handleChangePage}
      onRowsPerPageChange={props.handleChangeRowsPerPage}
    />
  );
};

export default Pagination;
