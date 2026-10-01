document.addEventListener("DOMContentLoaded", () => {

    const notificationButton =
        document.querySelector(".notification-btn");

    if (notificationButton) {

        notificationButton.addEventListener("click", () => {

            alert(
                "You currently have no new notifications."
            );

        });

    }

});
