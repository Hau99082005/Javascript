"use client";
import PropertyForm from "@/components/propert-form";
import { bookDataSchema } from "@/validation/propertySchema";
import { PlusCircleIcon } from "lucide-react";
import { z } from "zod";
export default function NewPropertyForm() {
    const handleSubmit = async (data: z.infer<typeof bookDataSchema>) => {
       console.log(data);
    }
    return(
     <div>
        <PropertyForm handleSubmit={handleSubmit} submitButtonLabel={<>
            <PlusCircleIcon/> Create Property
            </>}/>
     </div>
    );
}