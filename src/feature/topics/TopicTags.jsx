import { memo } from "react";
import { Card, Stack } from "@mui/material";
import { Constants } from "../../utils/constants";
import Tag from "../components/Tag";
import Title from "../components/Title";

const TopicTags = ({ topics, navigate }) => {
  const handleClick = (name) => {
    navigate(`/topics/${name}`, { state: { topic: name } });
  };

  return (
    <Card sx={{ margin: 5 }}>
      <Title
        titlelabel={"Related Topics"}
        variant={"h5"}
        sx={{ margin: 3 }}
        nodata={(topics && topics.length === 0) ? Constants.NO_DATA : ""}
      />
      <Stack direction="row" spacing={1} sx={{ margin: 3 }}>
        {topics.map((row, index) => {
          return (
            <Tag
              key={index}
              data={row}
              onClick={() => {
                handleClick(row.name);
              }}
            />
          );
        })}
      </Stack>
    </Card>
  );
};

export default memo(TopicTags);
