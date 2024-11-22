interface DeleteJobButtonProps {
  jobId: string;
  sectionId: string;
  refreshJobs: () => void;
}

const DeleteJobButton: React.FC<DeleteJobButtonProps> = ({
  jobId,
  sectionId,
  refreshJobs,
}) => {
  const deleteCard = async () => {
    try {
      const response = await fetch("/api/job/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId, sectionId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete job");
      }
      refreshJobs();
    } catch {
      alert("Error deleting job");
    }
  };

  return (
    <button
      onClick={(e) => {
        deleteCard();
        e.stopPropagation();
      }}
    >
      🗑️
    </button>
  );
};

export default DeleteJobButton;
