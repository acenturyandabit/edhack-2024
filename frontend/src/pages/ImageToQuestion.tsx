import { Box, Button, Input } from "@mui/material";
import * as React from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

function ImageToQuestion() {
  const [questionPhoto, setQuestionPhoto] = React.useState<string | null>(null);

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setQuestionPhoto(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      {/* Empty Box for Image Preview */}
      <Box
        sx={{
          marginTop: "30px",
          width: "90%",
          height: "350px",
          border: "1px solid #ccc",
          borderRadius: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
        {questionPhoto && (
          <Box
            component="img"
            src={questionPhoto}
            alt="questionPhoto Preview"
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: 2,
              objectFit: "cover",
            }}
          />
        )}
      </Box>

      {/* Upload Button */}
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
      >
        Upload questionPhoto
        <Input
          type="file"
          onChange={handleUploadImage}
          inputProps={{
            accept: "image/*",
            multiple: false,
          }}
          style={{ display: "none" }}
        />
      </Button>
    </Box>
  );
}

export default ImageToQuestion;
