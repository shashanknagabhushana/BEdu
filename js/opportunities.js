document.addEventListener("DOMContentLoaded", () => {


    const searchInput =
        document.getElementById(
            "opportunitySearch"
        );


    const filters =
        document.querySelectorAll(
            ".filter"
        );


    const cards =
        document.querySelectorAll(
            ".opportunity-card"
        );


    const emptyState =
        document.getElementById(
            "emptyState"
        );


    const notificationButton =
        document.querySelector(
            ".notification-btn"
        );


    let selectedFilter = "all";


    /*
    ------------------------------------------
    FILTER OPPORTUNITIES
    ------------------------------------------
    */

    function filterOpportunities() {

        const searchTerm =
            searchInput.value
                .toLowerCase()
                .trim();


        let visibleCount = 0;


        cards.forEach(card => {

            const type =
                card.dataset.type;

            const searchData =
                card.dataset.search
                    .toLowerCase();


            let matchesFilter = false;


            if (
                selectedFilter === "all"
            ) {

                matchesFilter = true;

            } else {

                matchesFilter =
                    type === selectedFilter;

            }


            const matchesSearch =
                searchData.includes(
                    searchTerm
                );


            if (
                matchesFilter &&
                matchesSearch
            ) {

                card.style.display =
                    "flex";

                visibleCount++;

            } else {

                card.style.display =
                    "none";

            }

        });


        if (visibleCount === 0) {

            emptyState.style.display =
                "block";

        } else {

            emptyState.style.display =
                "none";

        }

    }


    /*
    ------------------------------------------
    FILTER BUTTONS
    ------------------------------------------
    */

    filters.forEach(filter => {

        filter.addEventListener(
            "click",
            () => {

                filters.forEach(item => {

                    item.classList.remove(
                        "active"
                    );

                });


                filter.classList.add(
                    "active"
                );


                selectedFilter =
                    filter.dataset.type;


                filterOpportunities();

            }
        );

    });


    /*
    ------------------------------------------
    SEARCH
    ------------------------------------------
    */

    searchInput.addEventListener(
        "input",
        filterOpportunities
    );


    /*
    ------------------------------------------
    APPLY / VIEW BUTTONS
    ------------------------------------------
    */

    const applyButtons =
        document.querySelectorAll(
            ".apply-btn"
        );


    applyButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const role =
                    button.dataset.role;


                alert(
                    `You selected the ${role} opportunity.\n\nApplication 
functionality will be connected to BEdu accounts and Firebase later.`
                );

            }
        );

    });


    /*
    ------------------------------------------
    NOTIFICATIONS
    ------------------------------------------
    */

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
