import { useFormContext } from "react-hook-form";

export default function Step3() {
  const form = useFormContext();
  return (
    <div className="w-full ">
      <div className="text-3xl">Step 3</div>
      <code className="w-full">
        <pre className="w-full text-sm">
          {JSON.stringify(form.watch(), null, 2)}
        </pre>
      </code>
    </div>
  );
}
