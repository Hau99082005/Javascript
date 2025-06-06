"use client";
import PropertyForm from "@/components/propert-form";
import { useAuth } from "@/context/auth";
import { bookDataSchema } from "@/validation/propertySchema";
import { PlusCircleIcon } from "lucide-react";
import { z } from "zod";
import { saveNewProperty } from "./actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function NewPropertyForm() {
    const auth = useAuth();
    const route = useRouter();

    const handleSubmit = async (data: z.infer<typeof bookDataSchema>) => {
        const token = await auth?.currentUser?.getIdToken();

        if(!token) {
            return;
        }
        const response = await saveNewProperty({...data, token});
        if(!!response.error) {
            toast.error("Error!", {
                description: response.error
            });
            return;
        }
        toast.success("Success!", {
            description: "Property created!",
        });

        route.push("/admin-dashboard");
        console.log(token);
       console.log(data);
       console.log({response});
    }
    return(
   <div className="bg-transparent">
  <PropertyForm 
    handleSubmit={handleSubmit}
    submitButtonLabel={
      <div
        className="flex gap-2 items-center justify-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
      >
        <PlusCircleIcon className="w-5 h-5" />
        Create Property
      </div>
    }
  />
</div>

    );
}