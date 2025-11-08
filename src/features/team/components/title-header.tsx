import type { JSX } from "react";

import styles from "./team.module.scss";

type TitleHeaderProps = {
  text: string;
};

export const TitleHeader = ({ text }: TitleHeaderProps): JSX.Element => {
  return <h1 className={styles.title}>{text.toUpperCase()}</h1>;
};
