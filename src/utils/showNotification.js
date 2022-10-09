const ipcHelpers = window.electronService

const restoreApplication = () => ipcHelpers?.sendRestoreAppMessage()

const showNotification = (text) => {
    const nativeNotification = new Notification("tracker", {
        body: text,
        icon: "logo.png",
    });

    nativeNotification.addEventListener("click", restoreApplication);

    document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") {
            nativeNotification.close();
        }
    });
};

export default showNotification;
