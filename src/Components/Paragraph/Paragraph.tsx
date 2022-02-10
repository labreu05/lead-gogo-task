import "./styles.scss";

type Props = {
  text: string;
};

export const Paragraph = ({ text }: Props) => {
  return <div className="paragraph">{text}</div>;
};
