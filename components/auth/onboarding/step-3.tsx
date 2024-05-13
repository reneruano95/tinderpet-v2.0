import { useFormContext } from "react-hook-form";

export default function Step3() {
  const form = useFormContext();
  return (
    <div className="w-full ">
      <div className="space-y-2 text-left">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
          Review & Submit
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
          Review all the details you entered so far and submit.
        </p>
      </div>

      <pre className="w-full text-sm bg-gray-100 pt-4 rounded-lg dark:bg-neutral-800">
        {JSON.stringify(form.watch(), null, 2)}
      </pre>
    </div>
  );
}
