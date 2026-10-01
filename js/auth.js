```javascript
document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       SIGNUP
    ========================= */

    const signupForm = document.getElementById("signupForm");

    if (signupForm) {

        signupForm.addEventListener("submit", (event) => {

            event.preventDefault();

            const name =
                document.getElementById("name").value.trim();

            const email =
                
document.getElementById("email").value.trim().toLowerCase();

            const password =
                document.getElementById("password").value;

            const confirmPassword =
                document.getElementById("confirmPassword").value;

            const terms =
                document.getElementById("terms");

            const message =
                document.getElementById("signupMessage");


            /* Validation */

            if (!name || !email || !password || !confirmPassword) {

                showMessage(
                    message,
                    "Please fill in all fields.",
                    "error"
                );

                return;
            }


            if (password.length < 6) {

                showMessage(
                    message,
                    "Password must contain at least 6 characters.",
                    "error"
                );

                return;
            }


            if (password !== confirmPassword) {

                showMessage(
                    message,
                    "Passwords do not match.",
                    "error"
                );

                return;
            }


            if (terms && !terms.checked) {

                showMessage(
                    message,
                    "Please accept the terms and conditions.",
                    "error"
                );

                return;
            }


            /* Check existing account */

            const existingUser =
                JSON.parse(
                    localStorage.getItem("beduUser")
                );


            if (
                existingUser &&
                existingUser.email === email
            ) {

                showMessage(
                    message,
                    "An account with this email already exists.",
                    "error"
                );

                return;
            }


            /* Create user */

            const user = {

                name: name,

                email: email,

                password: password,

                college: "AITS Tirupati",

                degree: "B.Tech - CSE",

                graduationYear: "2027",

                location: "India",

                createdAt:
                    new Date().toISOString()

            };


            localStorage.setItem(
                "beduUser",
                JSON.stringify(user)
            );


            localStorage.setItem(
                "beduLoggedIn",
                "true"
            );


            showMessage(
                message,
                "Account created successfully! Redirecting...",
                "success"
            );


            setTimeout(() => {

                window.location.href =
                    "dashboard.html";

            }, 1000);

        });

    }


    /* =========================
       LOGIN
    ========================= */

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener("submit", (event) => {

            event.preventDefault();


            const email =
                
document.getElementById("email").value.trim().toLowerCase();

            const password =
                document.getElementById("password").value;


            const message =
                document.getElementById("loginMessage");


            if (!email || !password) {

                showMessage(
                    message,
                    "Please enter your email and password.",
                    "error"
                );

                return;
            }


            const savedUser =
                JSON.parse(
                    localStorage.getItem("beduUser")
                );


            if (!savedUser) {

                showMessage(
                    message,
                    "No account found. Please create an account first.",
                    "error"
                );

                return;
            }


            if (
                savedUser.email !== email ||
                savedUser.password !== password
            ) {

                showMessage(
                    message,
                    "Incorrect email or password.",
                    "error"
                );

                return;
            }


            localStorage.setItem(
                "beduLoggedIn",
                "true"
            );


            showMessage(
                message,
                "Login successful! Redirecting...",
                "success"
            );


            setTimeout(() => {

                window.location.href =
                    "dashboard.html";

            }, 800);

        });

    }


    /* =========================
       GOOGLE LOGIN DEMO
    ========================= */

    const googleLogin =
        document.getElementById("googleLogin");

    const googleSignup =
        document.getElementById("googleSignup");


    function demoGoogleLogin() {

        const demoUser = {

            name: "Google User",

            email: "googleuser@bedu.demo",

            college: "AITS Tirupati",

            degree: "B.Tech - CSE",

            graduationYear: "2027",

            location: "India"

        };


        localStorage.setItem(
            "beduUser",
            JSON.stringify(demoUser)
        );


        localStorage.setItem(
            "beduLoggedIn",
            "true"
        );


        window.location.href =
            "dashboard.html";

    }


    if (googleLogin) {

        googleLogin.addEventListener(
            "click",
            demoGoogleLogin
        );

    }


    if (googleSignup) {

        googleSignup.addEventListener(
            "click",
            demoGoogleLogin
        );

    }


    /* =========================
       MESSAGE FUNCTION
    ========================= */

    function showMessage(
        element,
        message,
        type
    ) {

        if (!element) return;

        element.textContent =
            message;

        element.className =
            `auth-message ${type}`;

    }

});
```

