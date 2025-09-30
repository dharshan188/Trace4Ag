import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import { QRCodeCanvas } from "qrcode.react";
import { Html5Qrcode, Html5QrcodeScanner } from "html5-qrcode";

export default function QRCodePage() {
  const { t } = useTranslation();
  const [qrData, setQrData] = useState("");
  const [scannedData, setScannedData] = useState("");
  const [isScannerRunning, setIsScannerRunning] = useState(false);

  useEffect(() => {
    if (!isScannerRunning) {
      return;
    }

    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      },
      false
    );

    const onScanSuccess = (decodedText: string) => {
      setScannedData(decodedText);
      setIsScannerRunning(false);
    };

    const onScanFailure = () => {
      // console.warn(`Code scan error = ${error}`);
    };

    scanner.render(onScanSuccess, onScanFailure);

    return () => {
      scanner.clear().catch((error) => {
        console.error("Failed to clear html5QrcodeScanner.", error);
      });
    };
  }, [isScannerRunning]);

  const handleStartScanner = () => {
    setIsScannerRunning(true);
  };

  const handleStopScanner = () => {
    setIsScannerRunning(false);
  };

  return (
    <div className="min-h-screen container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{t("qr_code_page_title")}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>{t("qr_code_generator")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <Input
                placeholder={t("enter_data_for_qr_code")}
                value={qrData}
                onChange={(e) => setQrData(e.target.value)}
              />
              {qrData && (
                <div className="p-4 border rounded-lg self-center">
                  <QRCodeCanvas value={qrData} size={256} />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t("qr_code_scanner")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              {!isScannerRunning ? (
                <Button onClick={handleStartScanner}>{t("start_scanner")}</Button>
              ) : (
                <Button onClick={handleStopScanner} variant="destructive">{t("stop_scanner")}</Button>
              )}

              {isScannerRunning && <div id="reader" style={{ width: "100%" }}></div>}

              {scannedData && (
                <div className="p-4 border rounded-lg bg-green-100">
                  <p className="text-green-800 font-medium">
                    {t("scanned_data")}: {scannedData}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}