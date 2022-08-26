import React, { memo } from "react";
import Table from "../components/Table";
import { useLocation } from "react-router-dom";
import { useGetTopics } from "../../graphql/topics/hooks";
import Chip from "@mui/material/Chip";
import Stars from "@mui/icons-material/Stars";
import TopicTags from "./TopicTags";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

const columns = [
  { id: "name", label: "Name" },
  {
    id: "resourcePath",
    label: "Resource Path",
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "stargazerCount",
    label: "Stargazer count",
    minWidth: 50,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];

const Topics = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { topics, relatedTopics, loading, totalCount } = useGetTopics(
    location?.state?.topic ?? "react"
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
    if (column.id === "stargazerCount") {
      cellValue = <Chip color="secondary" label={value} icon={<Stars />} />;
    } else if (column.id === "relatedTopics") {
      cellValue = value;
    } else {
      cellValue =
        column.format && typeof value === "number"
          ? column.format(value)
          : value;
    }
    return cellValue;
  };

  return (
    <React.Fragment>
      <Spinner loading={loading} />
      <TopicTags topics={relatedTopics} navigate={navigate} />
      <Table
        columns={columns}
        data={topics}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        getCellValue={getCellValue}
        totalCount={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
      />
    </React.Fragment>
  );
};

export default memo(Topics);
