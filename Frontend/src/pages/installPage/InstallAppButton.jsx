import { useEffect, useState } from "react";

const InstallAppButton = ({
  label = "Install App",
  onInstalled,
  mobile = false,
}) => {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      console.log("✅ beforeinstallprompt FIRED");

      event.preventDefault();
      setInstallPrompt(event);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Check if app is already installed
    const standalone = window.matchMedia("(display-mode: standalone)").matches;

    if (standalone) {
      setIsInstalled(true);
    }

    console.log("📱 InstallAppButton mounted");

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) {
      console.log("❌ No install prompt available");
      return;
    }

    console.log("📲 Showing install prompt");

    installPrompt.prompt();

    const { outcome } = await installPrompt.userChoice;

    console.log("Install result:", outcome);

    if (outcome === "accepted") {
      setIsInstalled(true);
      setInstallPrompt(null);

      if (onInstalled) {
        onInstalled();
      }
    }
  };

  // Don't show if already installed
  // or browser hasn't provided the install prompt
  if (isInstalled || !installPrompt) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={handleInstall}
      className={
        mobile
          ? `
            flex
            w-full
            items-center
            gap-3
            rounded-lg
            px-3
            py-2.5
            text-sm
            font-semibold
            leading-normal
            text-white
            transition
            hover:bg-[#252525]
            hover:text-[#c6ff00]
          `
          : `
            flex
            items-center
            justify-center
            rounded-xl
            border
            border-[#404040]
            bg-transparent
            px-5
            py-2.5
            text-sm
            font-semibold
            leading-normal
            text-white
            transition-all
            hover:border-[#c6ff00]
            hover:text-[#c6ff00]
          `
      }
    >
      <span className="text-[#c6ff00]">↓</span>
      <span>{label}</span>
    </button>
  );
};

export default InstallAppButton;
