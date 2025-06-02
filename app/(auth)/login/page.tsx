import ContinueWithGoogleButton from "@/components/continue-with-google";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default function Login() {
    return <div>
        <Card>
            <CardHeader>
               <CardTitle className="text-3xl font-semibold">
                 Đăng Nhập 
                </CardTitle>                
            </CardHeader>
        </Card>
        <ContinueWithGoogleButton/>
       
    </div>
}