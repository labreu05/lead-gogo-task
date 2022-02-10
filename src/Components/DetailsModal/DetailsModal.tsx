import { Modal } from "antd";
import { ReactElement } from "react";
import "./styles.scss";

type Props = {
  header?: ReactElement;
  body?: ReactElement;
  extra?: ReactElement;
  onClose: () => void;
  visible: boolean;
  extraClassName?: string;
};

export const DetailsModal = ({
  header,
  body,
  extra,
  onClose,
  visible,
  extraClassName = "",
}: Props) => {
  return (
    <Modal
      visible={visible}
      className={`details-modal ${extraClassName}`}
      footer={null}
      title={null}
      width={"100%"}
      onCancel={onClose}
      closeIcon={
        <img
          src="icon_close.png"
          alt="close modal"
          className="close-modal-icon"
        />
      }
    >
      <div className="header">{header}</div>
      <span className="modal-body">
        <div className="main-section">{body}</div>
        {extra ? (
          <>
            <span className="divider"></span>
            <div className="sub-section">{extra}</div>
          </>
        ) : null}
      </span>
    </Modal>
  );
};
