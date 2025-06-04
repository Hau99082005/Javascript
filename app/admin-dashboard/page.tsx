import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { getBooks } from "@/data/properties";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
    const data = await getBooks();
    console.log({data});
    return(
     <div>
        <Breadcrumb items={[{
            label: "Dashboard",
        }]}/>
        <h1 className="text-4xl font-bold mt-6">Admin DashBoard</h1>
        <Button asChild className="inline-flex pl-2 gap-2 mt-4">
            <Link href={'/admin-dashboard/new'}><PlusCircleIcon/> New Property</Link>
        </Button>
     </div>
    );
}