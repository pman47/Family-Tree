import React, { useState, useRef } from "react";
import { Box, Button, Input, Modal, Typography } from "@mui/material";

import { useTreeState, useSelectedNodeState } from "../../contexts";
import { modelStyle, style } from "./Button";

const FILE_ID = "FILE_ID";

export const ImportFamilyBtn = () => {
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const BASE_URLS = {
    METADATA_URL: `https://www.googleapis.com/drive/v3/files/FILE_ID?key=${apiKey}`,
    CONTENT_URL: `https://www.googleapis.com/drive/v3/files/FILE_ID?alt=media&key=${apiKey}`,
  };

  const [selectedNode, setSelectedNode] = useSelectedNodeState();
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const [data, setData] = useTreeState();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleFileUpload = (file) => {
    const fr = new FileReader();
    fr.onload = function (e) {
      try {
        const result = JSON.parse(e.target.result);
        const formatted = JSON.stringify(result, null, 2);
        result.value = formatted;

        // console.log(result)
        setData(result);
        setSelectedNode(result);
      } catch (error) {
        // console.error('Error parsing JSON:', error)
        alert("Invalid JSON file");
      } finally {
        setIsLoading(false);
      }
    };

    fr.readAsText(file);
  };

  const handleUploadClick = () => {
    inputRef.current.click();
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsLoading(true);
      handleFileUpload(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setIsLoading(true);
      handleFileUpload(file);
    }
  };

  function extractFileIdFromUrl(url) {
    const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)\//);
    return match ? match[1] : url;
  }

  const getFileAPIUrl = (fileId) => {
    return BASE_URLS.METADATA_URL.replace(FILE_ID, fileId);
  };

  const getFileContentAPIUrl = (fileId) => {
    return BASE_URLS.CONTENT_URL.replace(FILE_ID, fileId);
  };

  const handleImportData = async (url) => {
    url = url?.trim() || "";

    const fileId = extractFileIdFromUrl(url);
    if (!fileId) return;

    const metadataUrl = getFileAPIUrl(fileId);
    const contentUrl = getFileContentAPIUrl(fileId);

    try {
      setIsLoading(true);
      const metadataResponse = await fetch(metadataUrl);
      const metadata = await metadataResponse.json();
      if (metadata?.error) {
        throw new Error(metadata.error?.message);
      }
      if (metadata?.mimeType !== "application/json") {
        throw new Error("File type is not a json.");
      }
      const contentResponse = await fetch(contentUrl);
      const content = await contentResponse.json();
      if (content?.error) {
        throw new Error(content.error?.message);
      }
      setData(content);
    } catch (error) {
      alert(error?.message || "Something went wrong, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const openModel = () => setIsOpen(true);
  const closeModel = (url) => {
    setIsOpen(false);
    setInputValue("");
    if (typeof url === "string" && url.trim()) {
      handleImportData(url);
    }
  };

  const clearTree = () => setData({});

  return (
    <>
      <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
        <input
          id="upload"
          ref={inputRef}
          type="file"
          style={{ display: "none" }}
          onChange={handleInputChange}
        />
        <Button sx={style} onClick={handleUploadClick} disabled={isLoading}>
          {isLoading ? "Importing data..." : "Import JSON"}
        </Button>
        <Button sx={style} onClick={openModel} disabled={isLoading}>
          {isLoading ? "Importing data..." : "Fetch from G-Drive"}
        </Button>
        <Button sx={style} onClick={clearTree}>
          Clear Tree
        </Button>
      </div>
      <Modal
        open={isOpen}
        onClose={closeModel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modelStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Enter drive url or drive file id
          </Typography>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="type here"
          />
          <br />
          <br />
          <br />
          <Button
            onClick={() => {
              closeModel(inputValue);
            }}
            variant={"contained"}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </>
  );
};
