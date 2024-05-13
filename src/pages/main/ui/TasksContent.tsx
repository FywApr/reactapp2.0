import { FC } from "react";
import { useGetMyTasks } from "../main-utils";
import { Card } from "../../../shared/ui/Card";
import { Typography } from "../../../shared/ui/Typography";
import { COLORS_BACKGROUND, COLORS_TEXT } from "../../../shared/ui/colors";

export const TasksContent: FC = function TasksContent() {
  const { data } = useGetMyTasks();
  return (
    <div className="columns-2 mt-4">
      {data?.map((item, index) => (
        <Card
          key={String([item, index])}
          className={`${COLORS_BACKGROUND.secondary100}`}
        >
          <Typography color={COLORS_TEXT.alternative}>{item.title}</Typography>
        </Card>
      ))}
    </div>
  );
};
