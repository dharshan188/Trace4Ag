import { QRCodeCanvas } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Copy, Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface QRCodeDisplayProps {
  batchId: string;
  farmerName: string;
  cropType: string;
  location: string;
}

export function QRCodeDisplay({
  batchId,
  farmerName,
  cropType,
  location,
}: QRCodeDisplayProps) {
  const { toast } = useToast();
  const qrData = JSON.stringify({ batchId, farmerName, cropType, location });

  const handleCopy = () => {
    navigator.clipboard.writeText(batchId);
    toast({
      title: "Copied!",
      description: "Batch ID has been copied to your clipboard.",
    });
  };

  const handleDownload = () => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = url;
      link.download = `qrcode-batch-${batchId}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="p-6 bg-white border rounded-lg text-center shadow-md print:shadow-none">
      <QRCodeCanvas
        value={qrData}
        size={256}
        includeMargin={true}
        className="mx-auto"
      />
      <div className="mt-6 text-left space-y-3">
        <div>
          <p className="text-sm font-medium text-gray-500">Batch ID</p>
          <p className="font-mono text-lg text-gray-800">{batchId}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Farmer</p>
          <p className="text-lg text-gray-800">{farmerName}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Crop</p>
          <p className="text-lg text-gray-800">{cropType}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Origin</p>
          <p className="text-lg text-gray-800">{location}</p>
        </div>
      </div>
      <div className="mt-6 flex justify-center space-x-4 print:hidden">
        <Button variant="outline" onClick={handleCopy}>
          <Copy className="mr-2 h-4 w-4" /> Copy ID
        </Button>
        <Button variant="outline" onClick={handleDownload}>
          <Download className="mr-2 h-4 w-4" /> Download
        </Button>
      </div>
    </div>
  );
}