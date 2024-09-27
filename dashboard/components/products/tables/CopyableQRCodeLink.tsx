import { getClientUrl } from "@/helpers/envConfig";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FiCopy } from "react-icons/fi";
import { Button, Tooltip, Whisper } from "rsuite";

const CopyableQRCodeLink = ({ rowData }: any) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    const link = `${getClientUrl()}/tag/${rowData.code}`;
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    });
  };
  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <span>{`${getClientUrl()}/tag/${rowData.code}`}</span>
        <Whisper
          trigger="hover"
          speaker={<Tooltip>{copied ? "Copied!" : "Copy"}</Tooltip>}
          placement="top"
        >
          <Button
            appearance="link"
            onClick={handleCopy}
            style={{ marginLeft: 6 }}
          >
            {copied ? <FaCheck size={17} /> : <FiCopy size={17} />}
          </Button>
        </Whisper>
      </div>
    </>
  );
};

export default CopyableQRCodeLink;
