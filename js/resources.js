document.addEventListener("DOMContentLoaded", () => {

    const categories =
        document.querySelectorAll(".category");

    const cards =
        document.querySelectorAll(".resource-card");

    const searchInput =
        document.getElementById("resourceSearch");

    const emptyState =
        document.getElementById("emptyState");


    let selectedCategory = "all";


    function filterResources() {

        const searchTerm =
            searchInput.value
                .toLowerCase()
                .trim();

        let visibleCount = 0;


        cards.forEach(card => {

            const category =
                card.dataset.category;

            const title =
                card.dataset.title.toLowerCase();


            const matchesCategory =
                selectedCategory === "all" ||
                category === selectedCategory;


            const matchesSearch =
                title.includes(searchTerm);


            if (
                matchesCategory &&
                matchesSearch
            ) {

                card.style.display = "flex";

                visibleCount++;

            } else {

                card.style.display = "none";

            }

        });


        if (visibleCount === 0) {

            emptyState.style.display = "block";

        } else {

            emptyState.style.display = "none";

        }

    }


    categories.forEach(category => {

        category.addEventListener(
            "click",
            () => {

                categories.forEach(item => {

                    item.classList.remove("active");

                });


                category.classList.add("active");


                selectedCategory =
                    category.dataset.category;


                filterResources();

            }
        );

    });


    searchInput.addEventListener(
        "input",
        filterResources
    );


    const resourceButtons =
        document.querySelectorAll(".resource-btn");


    resourceButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const resource =
                    button.dataset.resource;


                alert(
                    `${resource} learning module will be available here.`
                );

            }
        );

    });


});
