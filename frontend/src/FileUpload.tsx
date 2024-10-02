import React, { useState } from 'react';
import { IconButton } from '@fluentui/react/lib/Button';
import { IIconProps } from '@fluentui/react/lib/Icon';

const paperclipIcon: IIconProps = { iconName: 'Attach' };

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      alert('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="fileUpload"
      />
      <label htmlFor="fileUpload">
        <IconButton iconProps={paperclipIcon} ariaLabel="Attach File" />
      </label>
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
