import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import PropertiesTable from "./properties-table";

export default async function AdminDashboard() {
    return(
     <div> 
        <Breadcrumb items={[{
            label: "Dashboard",
        }]}/>
        <h1 className="text-4xl font-bold mt-6">Admin DashBoard</h1>
        <Button asChild className="inline-flex pl-2 gap-2 mt-4 bg-white text-black">
            <Link href={'/admin-dashboard/new'} className="text-decoration-none"><PlusCircleIcon/> New Property</Link>
        </Button>
        <PropertiesTable/>
     </div>
    );
}