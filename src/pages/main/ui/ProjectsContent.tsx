import { FC } from "react";
import { useGetProjects } from "../main-utils";
import { Card } from "../../../shared/ui/Card";
import { Typography } from "../../../shared/ui/Typography";
import { COLORS_BACKGROUND } from "../../../shared/ui/colors";

export const ProjectsContent: FC = function ProjectsContent() {
  const { data } = useGetProjects();
  return (
    <div className="columns-2 mt-4">
      {data?.map((item) => (
        <Card key={item.id} className={`${COLORS_BACKGROUND.secondary100}`}>
          <Typography>{item.name}</Typography>
        </Card>
      ))}
    </div>
  );
};
