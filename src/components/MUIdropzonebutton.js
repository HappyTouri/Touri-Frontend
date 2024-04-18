import React, { useState } from "react";
import { DropzoneDialog } from "material-ui-dropzone";
import Button from "@material-ui/core/Button";

export function MUIdropzonebutton({ name, onSubmit, number_of_images }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        {name}
      </Button>

      <DropzoneDialog
        acceptedFiles={["image/*"]}
        cancelButtonText={"cancel"}
        submitButtonText={"submit"}
        maxFileSize={5000000} // 5 MB
        filesLimit={number_of_images || 1} // Allow up to 6 images
        open={open}
        onClose={() => setOpen(false)}
        onSave={(files) => {
          setOpen(false);
          onSubmit(files);
        }}
        showPreviews={true}
        showFileNamesInPreview={true}
      />
    </div>
  );
}
