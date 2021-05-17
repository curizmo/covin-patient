import React, { useEffect } from "react";
import { useParams } from "react-router";

import { getFile } from "../services/file";

const FileDownload = () => {
  const { container, file } = useParams();

  useEffect(() => {
    const fetchFile = async (container, file) => {
      const response = await getFile(container, file);

      downloadFileFromBlob(response, file);
    };

    const downloadFileFromBlob = (blob, fileName) => {
      const objectURL = window.URL.createObjectURL(blob);
      let link = document.createElement("a");
      link.setAttribute("href", objectURL);
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.close();
    };

    fetchFile(container, file);
  }, [container, file]);

  return <></>;
};

export default FileDownload;
