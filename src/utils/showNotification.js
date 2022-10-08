 const showNotification = (text) => {
        const nativeNotification = new Notification("tracker", {
            body: text,
            icon: "logo.png",
        });

        document.addEventListener("visibilitychange", () => {
            if (document.visibilityState === "visible") {
                nativeNotification.close();
            }
        });
    };

  export default showNotification