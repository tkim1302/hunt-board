const submitForm = async (
  event: React.FormEvent<HTMLFormElement>,
  type: string,
) => {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const data = Object.fromEntries(formData);

  try {
    if (type === "add") {
      const response = await fetch("/api/job/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to add job");
      }

      return response;
    }
    if (type === "edit") {
      const response = await fetch("/api/job/editDetail", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to edit job");
      }

      return response;
    }
  } catch {
    alert("Error Occured. Please try again later.");
  }
};

export default submitForm;
