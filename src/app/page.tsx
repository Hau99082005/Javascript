import Banner from "@/components/Banner";
import { Toaster } from "@/components/ui/sonner";


export default function Home() {
  return (
 <div className="w-full rounded-full">
   <Toaster richColors position="top-center"/>
   <Banner />
 </div>
  );
}
