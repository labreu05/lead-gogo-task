import { getDisplayId } from "../../Utils/helpers";
import "./styles.scss";

type Props = {
  id: number;
  description: string;
};

export const ListedItem = ({ id, description }: Props) => {
  return (
    <div className="listed-item">
      <div className="listed-id">{getDisplayId(id)}</div>
      <div className="listed-description">{description}</div>
    </div>
  );
};
