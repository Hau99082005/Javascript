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
     <div>
        <PropertyForm handleSubmit={handleSubmit} submitButtonLabel={<>
            <PlusCircleIcon/> Create Property
            </>}/>
     </div>
    );
}