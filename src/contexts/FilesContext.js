import React, {
  createContext,
  useState,
  useCallback,
  useContext,
} from "react";
import { v4 as uuidv4 } from "uuid";
import useApi from "../hooks/useApi";
import { toast } from "react-toastify";

const FileContext = createContext({});
  
const FileProvider = ({ children }) => {
  const [pictureUrl, setPictureUrl] = useState({});
  const api = useApi();

  const processUpload = useCallback(
    (uploadedFile) => {
      const data = new FormData();
      if (uploadedFile.file) {
        data.append("file", uploadedFile.file, uploadedFile.name);
      }
      api.user.updatePhoto(data).then( () => toast("Foto atualizada!")).catch( () => toast("Falha ao atualizar sua foto! (Talvez ela seja muito grande...)"));
    }, []
  );

  const handleUpload = useCallback(
    (files) => {
      const file = files[0];
      const newUploadedFile = {
        file,
        id: uuidv4(),
        name: file.name,
        preview: URL.createObjectURL(file),
        progress: 0,
        uploaded: false,
        error: false,
        url: "",
      };
      setPictureUrl(newUploadedFile.preview);
      processUpload(newUploadedFile);
    },
    [processUpload]
  );
  
  return (
    <FileContext.Provider value={{ pictureUrl, setPictureUrl, handleUpload }}>
      {children}
    </FileContext.Provider>
  );
};
  
function useFiles() {
  const context = useContext(FileContext);
  
  if (!context) {
    throw new Error("useFiles must be used within FileProvider");
  }

  return context;
}
  
export { FileProvider, useFiles };
  
