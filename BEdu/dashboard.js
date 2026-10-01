```javascript
document.addEventListener("DOMContentLoaded", () => {

    // -----------------------------
    // LOGIN PROTECTION
    // -----------------------------

    const loggedIn =
        localStorage.getItem("beduLoggedIn");

    if (loggedIn !== "true") {
        window.location.href = "login.html";
        return;
    }


    // -----------------------------
    // LOAD USER
    // -----------------------------

    const savedUser =
        JSON.parse(
            localStorage.getItem("beduUser")
        );

    if (savedUser) {

        const nameElements =
            document.querySelectorAll(
                ".user-name, .welcome-name"
            );

        nameElements.forEach(element => {
            element.textContent =
                savedUser.name || "Student";
        });

    }


    // -----------------------------
    // GET ASSESSMENT SCORES
    // -----------------------------

    const tests = [
        {
            key: "java",
            name: "Java",
            storageKey: "bedu_java_score"
        },
        {
            key: "sql",
            name: "SQL",
            storageKey: "bedu_sql_score"
        },
        {
            key: "aptitude",
            name: "Aptitude",
            storageKey: "bedu_aptitude_score"
        }
    ];


    let completedTests = [];
    let totalPercentage = 0;


    tests.forEach(test => {

        const savedScore =
            localStorage.getItem(
                test.storageKey
            );

        if (savedScore) {

            try {

                const result =
                    JSON.parse(savedScore);

                if (
                    result &&
                    typeof result.percentage === "number"
                ) {

                    completedTests.push({
                        ...test,
                        percentage:
                            result.percentage
                    });

                    totalPercentage +=
                        result.percentage;

                }

            } catch (error) {

                console.log(
                    "Unable to read score:",
                    test.name
                );

            }

        }

    });


    // -----------------------------
    // CALCULATE DASHBOARD VALUES
    // -----------------------------

    const assessmentCount =
        completedTests.length;

    const averageScore =
        assessmentCount > 0
            ? Math.round(
                totalPercentage /
                assessmentCount
            )
            : 0;


    // -----------------------------
    // UPDATE STAT CARDS
    // -----------------------------

    const statCards =
        document.querySelectorAll(
            ".stat-card"
        );

    statCards.forEach(card => {

        const text =
            card.textContent
                .toLowerCase();

        const valueElement =
            card.querySelector(
                "h2, h3, .stat-number, .stat-value"
            );

        if (!valueElement) {
            return;
        }


        if (
            text.includes(
                "assessment"
            ) &&
            text.includes(
                "completed"
            )
        ) {

            valueElement.textContent =
                assessmentCount;

        }


        if (
            text.includes(
                "average"
            ) &&
            text.includes(
                "score"
            )
        ) {

            valueElement.textContent =
                `${averageScore}%`;

        }

    });


    // -----------------------------
    // UPDATE PROGRESS BARS
    // -----------------------------

    const progressItems =
        document.querySelectorAll(
            ".progress-item"
        );


    progressItems.forEach(item => {

        const text =
            item.textContent
                .toLowerCase();


        let percentage = null;


        if (text.includes("java")) {

            const javaResult =
                completedTests.find(
                    test =>
                        test.key === "java"
                );

            if (javaResult) {
                percentage =
                    javaResult.percentage;
            }

        }


        if (text.includes("sql")) {

            const sqlResult =
                completedTests.find(
                    test =>
                        test.key === "sql"
                );

            if (sqlResult) {
                percentage =
                    sqlResult.percentage;
            }

        }


        if (
            text.includes("aptitude")
        ) {

            const aptitudeResult =
                completedTests.find(
                    test =>
                        test.key === "aptitude"
                );

            if (aptitudeResult) {
                percentage =
                    aptitudeResult.percentage;
            }

        }


        if (percentage !== null) {

            const progressFill =
                item.querySelector(
                    ".progress-fill"
                );

            const percentageText =
                item.querySelector(
                    ".progress-percentage"
                );


            if (progressFill) {

                progressFill.style.width =
                    `${percentage}%`;

            }


            if (percentageText) {

                percentageText.textContent =
                    `${percentage}%`;

            }

        }

    });


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


    // -----------------------------
    // LOGOUT
    // -----------------------------

    const logoutLink =
        document.querySelector(
            ".logout-link"
        );

    if (logoutLink) {

        logoutLink.addEventListener(
            "click",
            event => {

                event.preventDefault();


                const confirmLogout =
                    confirm(
                        "Are you sure you want to logout?"
                    );


                if (!confirmLogout) {
                    return;
                }


                localStorage.removeItem(
                    "beduLoggedIn"
                );


                window.location.href =
                    "index.html";

            }
        );

    }

});
```

