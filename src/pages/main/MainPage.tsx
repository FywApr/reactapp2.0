import { FC, useState } from "react";
import { TabMenu, TabMenuItem } from "../../shared/ui/TabMenu";
import { ProjectsContent } from "./ui/ProjectsContent";
import { TasksContent } from "./ui/TasksContent";

const TABS: TabMenuItem[] = [
  {
    index: 0,
    title: "Проекты",
  },
  {
    index: 1,
    title: "Задачи",
  },
];

export const MainPage: FC = function MainPage() {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  return (
    <section className={"flex flex-1 flex-col"}>
      <TabMenu
        data={TABS}
        activeIndex={activeTabIndex}
        onChangeIndex={setActiveTabIndex}
      />
      {activeTabIndex === 0 ? <ProjectsContent /> : <TasksContent />}
    </section>
  );
};
