import { FC, useCallback } from "react";
import { Typography } from "./Typography";
import { COLORS_BORDER } from "./colors";

export interface TabMenuItem {
  index: number;
  title: string;
}

interface Props {
  data: TabMenuItem[];
  activeIndex: number;
  onChangeIndex: (value: number) => void;
}

export const TabMenu: FC<Props> = function TabMenu(props) {
  const styles = `columns-${props.data.length} gap-0`;

  const renderItem = useCallback(
    (item: TabMenuItem) => (
      <Typography
        key={String(item.index)}
        align="center"
        className={`${props.activeIndex === item.index ? COLORS_BORDER.main100 : COLORS_BORDER.secondary100} border-b-2 p-2 cursor-pointer`}
        onClick={() => props.onChangeIndex(item.index)}
      >
        {item.title}
      </Typography>
    ),
    [props.activeIndex]
  );

  return <div className={styles}>{props.data.map(renderItem)}</div>;
};
