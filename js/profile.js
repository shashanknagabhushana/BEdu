```javascript
document.addEventListener("DOMContentLoaded", () => {

    let user =
        JSON.parse(
            localStorage.getItem("beduUser")
        );


    // Default demo user

    if (!user) {

        user = {

            name: "Shashank P N",

            email: "student@bedu.com",

            college: "AITS Tirupati",

            degree: "B.Tech - CSE",

            graduationYear: "2027",

            location: "India"

        };

    }


    // -----------------------------
    // DISPLAY USER INFORMATION
    // -----------------------------

    const nameElements =
        document.querySelectorAll(
            ".profile-name, .user-name"
        );

    nameElements.forEach(element => {

        element.textContent =
            user.name || "Student";

    });


    const emailElement =
        document.querySelector(
            ".profile-email"
        );

    if (emailElement) {

        emailElement.textContent =
            user.email || "Not available";

    }


    const collegeElement =
        document.querySelector(
            ".profile-college"
        );

    if (collegeElement) {

        collegeElement.textContent =
            user.college || "AITS Tirupati";

    }


    const degreeElement =
        document.querySelector(
            ".profile-degree"
        );

    if (degreeElement) {

        degreeElement.textContent =
            user.degree || "B.Tech - CSE";

    }


    const graduationElement =
        document.querySelector(
            ".profile-graduation"
        );

    if (graduationElement) {

        graduationElement.textContent =
            user.graduationYear || "2027";

    }


    const locationElement =
        document.querySelector(
            ".profile-location"
        );

    if (locationElement) {

        locationElement.textContent =
            user.location || "India";

    }


    // -----------------------------
    // EDIT PROFILE
    // -----------------------------

    const editButton =
        document.getElementById(
            "editProfileBtn"
        );

    const editSection =
        document.getElementById(
            "editProfileSection"
        );

    const cancelButton =
        document.getElementById(
            "cancelEdit"
        );

    const profileForm =
        document.getElementById(
            "profileForm"
        );


    if (editButton && editSection) {

        editButton.addEventListener(
            "click",
            () => {

                editSection.style.display =
                    "block";


                const nameInput =
                    document.getElementById("name");

                const emailInput =
                    document.getElementById("email");

                const collegeInput =
                    document.getElementById("college");

                const degreeInput =
                    document.getElementById("degree");

                const graduationInput =
                    document.getElementById(
                        "graduationYear"
                    );

                const locationInput =
                    document.getElementById(
                        "location"
                    );


                if (nameInput)
                    nameInput.value =
                        user.name || "";

                if (emailInput)
                    emailInput.value =
                        user.email || "";

                if (collegeInput)
                    collegeInput.value =
                        user.college || "";

                if (degreeInput)
                    degreeInput.value =
                        user.degree || "";

                if (graduationInput)
                    graduationInput.value =
                        user.graduationYear || "";

                if (locationInput)
                    locationInput.value =
                        user.location || "";


                editSection.scrollIntoView({
                    behavior: "smooth"
                });

            }
        );

    }


    if (cancelButton && editSection) {

        cancelButton.addEventListener(
            "click",
            () => {

                editSection.style.display =
                    "none";

            }
        );

    }


    if (profileForm) {

        profileForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const nameInput =
                    document.getElementById("name");

                const emailInput =
                    document.getElementById("email");

                const collegeInput =
                    document.getElementById("college");

                const degreeInput =
                    document.getElementById("degree");

                const graduationInput =
                    document.getElementById(
                        "graduationYear"
                    );

                const locationInput =
                    document.getElementById(
                        "location"
                    );


                user.name =
                    nameInput
                        ? nameInput.value.trim()
                        : user.name;

                user.email =
                    emailInput
                        ? emailInput.value.trim()
                        : user.email;

                user.college =
                    collegeInput
                        ? collegeInput.value.trim()
                        : user.college;

                user.degree =
                    degreeInput
                        ? degreeInput.value.trim()
                        : user.degree;

                user.graduationYear =
                    graduationInput
                        ? graduationInput.value.trim()
                        : user.graduationYear;

                user.location =
                    locationInput
                        ? locationInput.value.trim()
                        : user.location;


                localStorage.setItem(
                    "beduUser",
                    JSON.stringify(user)
                );


                alert(
                    "Profile updated successfully!"
                );


                window.location.reload();

            }
        );

    }


    // -----------------------------
    // NOTIFICATIONS
    // -----------------------------

    const notificationButton =
        document.querySelector(
            ".notification-btn"
        );

    if (notificationButton) {

        notificationButton.addEventListener(
            "click",
            () => {

                alert(
                    "You currently have no new notifications."
                );

            }
        );

    }

});


