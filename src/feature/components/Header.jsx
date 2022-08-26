import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import SearchField from "./SearchField";
import Title from "./Title";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Header = ({ topic, setTopic }) => {
  const location = useLocation();
  const [searchText, setSearchText] = useState("react");
  const navigate = useNavigate();

  const onSearch = () => {
    navigate(`/topics/${searchText}`, { state: { topic: searchText } });
    setTopic(searchText);
  };

  return (
    <Box sx={{ flexGrow: 1, margin: 5 }}>
      <AppBar position="static">
        <Toolbar>
          <Title titlelabel={"TOPIC"} title={location?.state?.topic ?? topic} />
          <SearchField
            placeholder="Search Topic…"
            defaultValue="react"
            inputProps={{ "aria-label": "search" }}
            onSearch={setSearchText}
          />
          <Button
            sx={{ marginLeft: 2 }}
            variant="contained"
            color="primary"
            onClick={onSearch}
          >
            Search
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
