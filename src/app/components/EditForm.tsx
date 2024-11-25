import { useState } from "react";
import fetchSections from "../../../util/fetchSections";
import submitForm from "../../../util/submitForm";
import useLastUpdatedTimeStore from "../store/lastUpdatedTimeStore";
import useModalStore from "../store/modalStore";
import useSectionStore from "../store/sectionStore";

const EditForm: React.FC = () => {
  const { selectedSection, setSectionList } = useSectionStore();
  const { selectedJob, closeModal } = useModalStore();
  const { SetLastUpdated } = useLastUpdatedTimeStore();
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsSaving(true);
    await submitForm(event, "edit");
    await fetchSections(setSectionList, SetLastUpdated);
    setIsSaving(false);
    closeModal();
  };

  return (
    <div className="flex flex-col">
      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
        className="flex flex-col gap-10"
        action="/api/job/editDetail"
        method="POST"
      >
        <input type="hidden" name="_id" value={selectedJob!._id} />
        <input
          className="text-6xl dark:bg-gray-600 dark:text-gray-200"
          name="jobTitle"
          required
          defaultValue={selectedJob!.jobTitle}
          placeholder="Job Title (Required)"
        />
        <input
          className="text-3xl dark:bg-gray-600 dark:text-gray-200"
          name="company"
          required
          defaultValue={selectedJob!.company}
          placeholder="Company (Required)"
        />
        <div className="mt-10 flex flex-col gap-10 text-lg">
          <input
            className="dark:bg-gray-600 dark:text-gray-200"
            name="postURL"
            defaultValue={selectedJob!.postURL}
            placeholder="Post URL"
          />
          <input
            className="dark:bg-gray-600 dark:text-gray-200"
            name="salary"
            defaultValue={selectedJob!.salary}
            placeholder="Salary"
          />
          <input
            className="dark:bg-gray-600 dark:text-gray-200"
            name="location"
            defaultValue={selectedJob!.location}
            placeholder="Location"
          />
          <input
            className="dark:bg-gray-600 dark:text-gray-200"
            type="date"
            name="deadline"
            defaultValue={selectedJob!.deadline}
            placeholder="Deadline"
          />
        </div>
        <input type="hidden" name="section" value={selectedSection} />
        <div className="flex justify-center">
          <button
            className={`${isSaving ? "opacity-50" : ""} mt-20 h-12 w-32 rounded-xl bg-blue-500 text-2xl text-white`}
            type="submit"
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
