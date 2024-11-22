interface DeleteSectionButtonProps {
  sectionId: string;
  refreshJobs: () => void;
}

const DeleteSectionButton: React.FC<DeleteSectionButtonProps> = ({
  sectionId,
  refreshJobs,
}) => {
  const deleteCard = async () => {
    try {
      const response = await fetch("/api/section/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sectionId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete section");
      }
      refreshJobs();
    } catch {
      alert("Error deleting section");
    }
  };

  return <button onClick={() => deleteCard()}>🗑️</button>;
};

export default DeleteSectionButton;
