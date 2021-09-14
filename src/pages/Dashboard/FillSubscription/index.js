import PersonalInformationForm from "../../../components/PersonalInformationForm";
import { FileProvider } from "../../../contexts/FilesContext";

export default function FillSubscription() {
  return (
    <FileProvider>
      <PersonalInformationForm />
    </FileProvider>
  );
}
