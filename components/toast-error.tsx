import { AlertCircle } from "lucide-react";
import { AlertTitle } from "./ui/alert";
import { AuthError } from "@supabase/supabase-js";

export function ToastError({ error }: { error: AuthError | any }) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center space-x-2">
        <AlertCircle className="h-5 w-5 text-red-500 " />
        <AlertTitle className="m-0">Something went wrong. Error:</AlertTitle>
      </div>

      {error?.message ? (
        <p className="ps-7">{error.message}</p>
      ) : (
        <pre className="ps-6 w-full">{JSON.stringify(error, null, 2)}</pre>
      )}
    </div>
  );
}
