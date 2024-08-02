import { getData } from "@/components/getData";
import {QRCodeComponent} from "@/components/QR-Scanner";

export default async function Home() {

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <QRCodeComponent/>
        </main>
        );
    }
