import fetchSections from "../../../util/fetchSections";
import submitForm from "../../../util/submitForm";
import useLastUpdatedTimeStore from "../store/lastUpdatedTimeStore";
import useModalStore from "../store/modalStore";
import useSectionStore from "../store/sectionStore";

const AddForm: React.FC = () => {
  const { selectedSection, setSectionList } = useSectionStore();
  const { SetLastUpdated } = useLastUpdatedTimeStore();
  const { closeModal } = useModalStore();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    await submitForm(event, "add");
    fetchSections(setSectionList, SetLastUpdated);
    closeModal();
  };

  return (
    <div className="flex flex-col">
      <h4 className="mb-6 text-2xl font-semibold dark:text-gray-200">
        Add Job
      </h4>
      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
        className="flex flex-col gap-10"
        action="/api/job/new"
        method="POST"
      >
        <input
          className="dark:bg-gray-600 dark:text-gray-200"
          name="jobTitle"
          required
          placeholder="Job Title (Required)"
        />
        <input
          className="dark:bg-gray-600 dark:text-gray-200"
          name="company"
          required
          placeholder="Company (Required)"
        />
        <input
          className="dark:bg-gray-600 dark:text-gray-200"
          name="postURL"
          placeholder="Post URL"
        />
        <input
          className="dark:bg-gray-600 dark:text-gray-200"
          name="salary"
          placeholder="Salary"
        />
        <input
          className="dark:bg-gray-600 dark:text-gray-200"
          name="location"
          placeholder="Location"
        />
        <input
          className="dark:bg-gray-600 dark:text-gray-200"
          type="date"
          name="deadline"
          placeholder="Deadline"
        />
        <input type="hidden" name="section" value={selectedSection} />
        <div className="flex justify-center">
          <button
            className="mt-8 h-12 w-20 rounded-xl bg-blue-500 text-2xl text-white"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddForm;
