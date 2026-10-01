```javascript
document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       GET TEST TYPE
    ========================================= */

    const params =
        new URLSearchParams(window.location.search);

    const testType =
        params.get("test") || "java";


    /* =========================================
       TEST DATA
    ========================================= */

    const tests = {

        java: {
            title: "Java Fundamentals",
            category: "Programming",

            questions: [
                {
                    question: "Which keyword is used to create a class in 
Java?",
                    options: ["class", "struct", "object", "define"],
                    answer: 0
                },
                {
                    question: "Which concept allows a class to acquire 
properties of another class?",
                    options: ["Encapsulation", "Inheritance", 
"Polymorphism", "Abstraction"],
                    answer: 1
                },
                {
                    question: "Which of the following is a primitive data 
type?",
                    options: ["String", "Integer", "int", "ArrayList"],
                    answer: 2
                },
                {
                    question: "Which keyword is used when a class 
implements an interface?",
                    options: ["extends", "inherits", "implements", 
"interface"],
                    answer: 2
                },
                {
                    question: "Which method is the entry point of a Java 
program?",
                    options: ["start()", "run()", "main()", "execute()"],
                    answer: 2
                },
                {
                    question: "Which keyword is used for class 
inheritance?",
                    options: ["implements", "extends", "inherits", 
"superclass"],
                    answer: 1
                },
                {
                    question: "Which concept hides implementation 
details?",
                    options: ["Inheritance", "Abstraction", "Compilation", 
"Iteration"],
                    answer: 1
                },
                {
                    question: "Which symbol is normally used to end a Java 
statement?",
                    options: [".", ":", ";", ","],
                    answer: 2
                },
                {
                    question: "Which collection does not allow duplicate 
elements?",
                    options: ["List", "ArrayList", "Set", "Queue"],
                    answer: 2
                },
                {
                    question: "Which keyword is used to create an 
object?",
                    options: ["create", "object", "new", "instance"],
                    answer: 2
                }
            ]
        },


        sql: {
            title: "SQL Basics",
            category: "Database",

            questions: [
                {
                    question: "Which SQL command is used to retrieve 
data?",
                    options: ["GET", "SELECT", "FETCH", "READ"],
                    answer: 1
                },
                {
                    question: "Which command is used to add new records?",
                    options: ["INSERT", "ADD", "CREATE", "APPEND"],
                    answer: 0
                },
                {
                    question: "Which clause is used to filter records?",
                    options: ["FILTER", "WHERE", "HAVING", "CHECK"],
                    answer: 1
                },
                {
                    question: "Which command is used to modify existing 
records?",
                    options: ["CHANGE", "MODIFY", "UPDATE", "ALTER"],
                    answer: 2
                },
                {
                    question: "Which command removes an entire table?",
                    options: ["DELETE", "REMOVE", "DROP", "CLEAR"],
                    answer: 2
                },
                {
                    question: "Which key uniquely identifies a record?",
                    options: ["Foreign Key", "Primary Key", "Candidate 
Key", "Reference Key"],
                    answer: 1
                },
                {
                    question: "Which clause sorts query results?",
                    options: ["SORT BY", "ORDER BY", "GROUP BY", 
"ARRANGE"],
                    answer: 1
                },
                {
                    question: "Which function counts rows?",
                    options: ["SUM()", "COUNT()", "TOTAL()", "NUMBER()"],
                    answer: 1
                },
                {
                    question: "Which JOIN returns matching rows from both 
tables?",
                    options: ["LEFT JOIN", "RIGHT JOIN", "INNER JOIN", 
"FULL JOIN"],
                    answer: 2
                },
                {
                    question: "Which command creates a new table?",
                    options: ["NEW TABLE", "CREATE TABLE", "MAKE TABLE", 
"ADD TABLE"],
                    answer: 1
                }
            ]
        },


        aptitude: {
            title: "Quantitative Aptitude",
            category: "Aptitude",

            questions: [
                {
                    question: "What is 20% of 150?",
                    options: ["20", "25", "30", "35"],
                    answer: 2
                },
                {
                    question: "A number increases from 100 to 120. What is 
the percentage increase?",
                    options: ["10%", "15%", "20%", "25%"],
                    answer: 2
                },
                {
                    question: "What is the average of 10, 20 and 30?",
                    options: ["15", "20", "25", "30"],
                    answer: 1
                },
                {
                    question: "If 5 pens cost ₹50, what is the cost of one 
pen?",
                    options: ["₹5", "₹10", "₹15", "₹20"],
                    answer: 1
                },
                {
                    question: "What is 15 × 8?",
                    options: ["100", "110", "120", "130"],
                    answer: 2
                },
                {
                    question: "The ratio 20:30 is equal to:",
                    options: ["1:2", "2:3", "3:4", "4:5"],
                    answer: 1
                },
                {
                    question: "A train travels at 60 km/h for 2 hours. 
What distance does it cover?",
                    options: ["100 km", "110 km", "120 km", "130 km"],
                    answer: 2
                },
                {
                    question: "25% is equal to which fraction?",
                    options: ["1/2", "1/3", "1/4", "1/5"],
                    answer: 2
                },
                {
                    question: "What is the next number: 2, 4, 8, 16, ?",
                    options: ["20", "24", "32", "36"],
                    answer: 2
                },
                {
                    question: "If x + 10 = 25, what is x?",
                    options: ["10", "15", "20", "25"],
                    answer: 1
                }
            ]
        }

    };


    const test =
        tests[testType] || tests.java;


    /* =========================================
       ELEMENTS
    ========================================= */

    const titleElement =
        document.getElementById("testTitle");

    const categoryElement =
        document.getElementById("testCategory");

    const questionElement =
        document.getElementById("question");

    const optionsContainer =
        document.getElementById("options");

    const currentQuestionElement =
        document.getElementById("currentQuestion");

    const totalQuestionsElement =
        document.getElementById("totalQuestions");

    const progressBar =
        document.getElementById("progressBar");

    const timerElement =
        document.getElementById("timer");

    const previousButton =
        document.getElementById("previousBtn");

    const nextButton =
        document.getElementById("nextBtn");


    /* =========================================
       RESULT ELEMENTS
    ========================================= */

    const resultSection =
        document.getElementById("resultSection");

    const testSection =
        document.getElementById("testSection");

    const scoreElement =
        document.getElementById("score");

    const correctElement =
        document.getElementById("correct");

    const wrongElement =
        document.getElementById("wrong");

    const percentageElement =
        document.getElementById("percentage");

    const resultMessage =
        document.getElementById("resultMessage");


    /* =========================================
       SET TEST INFORMATION
    ========================================= */

    if (titleElement) {
        titleElement.textContent =
            test.title;
    }

    if (categoryElement) {
        categoryElement.textContent =
            test.category;
    }

    if (totalQuestionsElement) {
        totalQuestionsElement.textContent =
            test.questions.length;
    }


    /* =========================================
       VARIABLES
    ========================================= */

    let currentQuestion = 0;

    let selectedAnswers =
        new Array(test.questions.length).fill(null);

    let timeLeft = 600;

    let timer;


    /* =========================================
       DISPLAY QUESTION
    ========================================= */

    function displayQuestion() {

        const current =
            test.questions[currentQuestion];


        if (questionElement) {

            questionElement.textContent =
                current.question;

        }


        if (currentQuestionElement) {

            currentQuestionElement.textContent =
                currentQuestion + 1;

        }


        if (progressBar) {

            const progress =
                ((currentQuestion + 1) /
                    test.questions.length) * 100;

            progressBar.style.width =
                `${progress}%`;

        }


        if (optionsContainer) {

            optionsContainer.innerHTML = "";


            current.options.forEach(
                (option, index) => {

                    const button =
                        document.createElement("button");

                    button.type = "button";

                    button.className =
                        "option";

                    button.textContent =
                        option;


                    if (
                        selectedAnswers[currentQuestion]
                        === index
                    ) {

                        button.classList.add(
                            "selected"
                        );

                    }


                    button.addEventListener(
                        "click",
                        () => {

                            selectedAnswers[
                                currentQuestion
                            ] = index;


                            displayQuestion();

                        }
                    );


                    optionsContainer.appendChild(
                        button
                    );

                }
            );

        }


        if (previousButton) {

            previousButton.disabled =
                currentQuestion === 0;

        }


        if (nextButton) {

            if (
                currentQuestion ===
                test.questions.length - 1
            ) {

                nextButton.textContent =
                    "Submit Test";

            } else {

                nextButton.textContent =
                    "Next";

            }

        }

    }


    /* =========================================
       NEXT BUTTON
    ========================================= */

    if (nextButton) {

        nextButton.addEventListener(
            "click",
            () => {

                if (
                    selectedAnswers[currentQuestion]
                    === null
                ) {

                    alert(
                        "Please select an answer before continuing."
                    );

                    return;

                }


                if (
                    currentQuestion ===
                    test.questions.length - 1
                ) {

                    submitTest();

                } else {

                    currentQuestion++;

                    displayQuestion();

                }

            }
        );

    }


    /* =========================================
       PREVIOUS BUTTON
    ========================================= */

    if (previousButton) {

        previousButton.addEventListener(
            "click",
            () => {

                if (currentQuestion > 0) {

                    currentQuestion--;

                    displayQuestion();

                }

            }
        );

    }


    /* =========================================
       SUBMIT TEST
    ========================================= */

    function submitTest() {

        clearInterval(timer);


        let correct = 0;


        test.questions.forEach(
            (question, index) => {

                if (
                    selectedAnswers[index] ===
                    question.answer
                ) {

                    correct++;

                }

            }
        );


        const total =
            test.questions.length;

        const wrong =
            total - correct;

        const percentage =
            Math.round(
                (correct / total) * 100
            );


        /* Save score */

        localStorage.setItem(
            `bedu_${testType}_score`,
            JSON.stringify({
                score: correct,
                total: total,
                percentage: percentage,
                completedAt:
                    new Date().toISOString()
            })
        );


        /* Save completed assessment count */

        updateCompletedAssessments();


        /* Display result */

        if (scoreElement) {
            scoreElement.textContent =
                `${correct}/${total}`;
        }

        if (correctElement) {
            correctElement.textContent =
                correct;
        }

        if (wrongElement) {
            wrongElement.textContent =
                wrong;
        }

        if (percentageElement) {
            percentageElement.textContent =
                `${percentage}%`;
        }


        if (resultMessage) {

            if (percentage >= 80) {

                resultMessage.textContent =
                    "Excellent performance! Keep building your skills.";

            } else if (percentage >= 60) {

                resultMessage.textContent =
                    "Good effort! Continue practicing to improve your 
score.";

            } else {

                resultMessage.textContent =
                    "Keep practicing and try the assessment again.";

            }

        }


        if (testSection) {
            testSection.style.display =
                "none";
        }

        if (resultSection) {
            resultSection.style.display =
                "block";
        }

    }


    /* =========================================
       UPDATE COMPLETED ASSESSMENTS
    ========================================= */

    function updateCompletedAssessments() {

        let completed = 0;

        ["java", "sql", "aptitude"].forEach(
            type => {

                const saved =
                    localStorage.getItem(
                        `bedu_${type}_score`
                    );

                if (saved) {
                    completed++;
                }

            }
        );


        localStorage.setItem(
            "bedu_assessments_completed",
            completed.toString()
        );

    }


    /* =========================================
       TIMER
    ========================================= */

    function startTimer() {

        timer = setInterval(
            () => {

                timeLeft--;

                const minutes =
                    Math.floor(
                        timeLeft / 60
                    );

                const seconds =
                    timeLeft % 60;


                if (timerElement) {

                    timerElement.textContent =
                        `${minutes}:${seconds
                            .toString()
                            .padStart(2, "0")}`;

                }


                if (timeLeft <= 0) {

                    clearInterval(timer);

                    submitTest();

                }

            },
            1000
        );

    }


    /* =========================================
       START
    ========================================= */

    displayQuestion();

    startTimer();

});
```

