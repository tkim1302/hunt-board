interface DeleteButtonProps {
  jobId: string;
  sectionTitle: string;
  refreshJobs: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  jobId,
  sectionTitle,
  refreshJobs,
}) => {
  const deleteCard = async () => {
    try {
      const response = await fetch("/api/job/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId, sectionTitle }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete job");
      }
      refreshJobs();
    } catch {
      alert("Error deleting job");
    }
  };

  return <button onClick={() => deleteCard()}>🗑️</button>;
};

export default DeleteButton;
