import { useState, useEffect } from "react";
import { WifiOff, Wifi } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { isOnline, setupOfflineListener } from "@/lib/offline";

export const OfflineIndicator = () => {
  const [online, setOnline] = useState(isOnline());
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const cleanup = setupOfflineListener(
      () => {
        setOnline(true);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      },
      () => {
        setOnline(false);
        setShowAlert(true);
      }
    );

    return cleanup;
  }, []);

  if (!showAlert && online) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <Alert
        variant={online ? "default" : "destructive"}
        className="shadow-lg"
      >
        <div className="flex items-center gap-2">
          {online ? (
            <Wifi className="h-4 w-4 text-primary" />
          ) : (
            <WifiOff className="h-4 w-4" />
          )}
          <AlertDescription className="font-medium">
            {online
              ? "Back online - syncing data..."
              : "You're offline - changes will sync when connected"}
          </AlertDescription>
        </div>
      </Alert>
    </div>
  );
};
