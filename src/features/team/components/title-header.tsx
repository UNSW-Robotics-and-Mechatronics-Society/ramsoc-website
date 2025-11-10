import styles from "./team.module.scss";

interface TitleHeaderProps {
  text: string;
}

export const TitleHeader = ({ text }: TitleHeaderProps) => {
  return <h1 className={styles.title}>{text.toUpperCase()}</h1>;
};
