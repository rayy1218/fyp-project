function getWatchedHistory() {
    let result;

    $.ajax({
        url: "dashboard.php?action=watched-history",
    });

    //This reassignment of result is for prototype showcase use
    result = [
        {
            movie_id: 0,
            movie_title: "Movie 1",
            movie_thumbnail: "./resource/no-image.png"
        },
        {
            movie_id: 1,
            movie_title: "Movie 2",
            movie_thumbnail: "./resource/no-image.png"
        },
        {
            movie_id: 2,
            movie_title: "Movie 3",
            movie_thumbnail: "./resource/no-image.png"
        },
        {
            movie_id: 3,
            movie_title: "Movie 4",
            movie_thumbnail: "./resource/no-image.png"
        },
        {
            movie_id: 4,
            movie_title: "Movie 5",
            movie_thumbnail: "./resource/no-image.png"
        },
        {
            movie_id: 5,
            movie_title: "Movie 6",
            movie_thumbnail: "./resource/no-image.png"
        },
        {
            movie_id: 6,
            movie_title: "Movie 7",
            movie_thumbnail: "./resource/no-image.png"
        },
        {
            movie_id: 7,
            movie_title: "Movie 8",
            movie_thumbnail: "./resource/no-image.png"
        },
        {
            movie_id: 8,
            movie_title: "Movie 9",
            movie_thumbnail: "./resource/no-image.png"
        },
    ];

    let first = true, appending = "", i = 0;
    while (i < result.length) {
        appending += `
              <div class="carousel-item ${(first) ? " active" : ""}">
                <div class="row p-2">
            `;

        for (let j = 1; j <= 3; j += 1) {
            if (i >= result.length) {break;}
            const row = result[i];
            appending += `
                  <div class="col-lg-4 mb-2">
                    <div class="card">
                      <img src="${row.movie_thumbnail}" class="card-img-top" alt="movie-thumbnail"/>
                      <div class="card-body">
                        <h6 class="card-title">${row.movie_title}</h6>
                        <div class="row">
                          <a href="./movie-detail.html?movie-id=${row.movie_id}" class="btn btn-outline-primary col">Detail</a>
                          <a href="./ticket-purchase.html?movie-id=${row.movie_id}" class="btn btn-outline-secondary col">Book</a>
                        </div>
                      </div>
                    </div>
                  </div>
                `;
            i += 1;
        }

        appending += `
                </div>
              </div>
            `;
        first = false;
    }
    $("#watched-history-placeholder").html(appending);
}

function getPurchasedTicket() {
    let result;

    $.ajax({
        url: "dashboard.php?action=purchased-ticket",
    });

    //This reassignment of result is for prototype showcase use
    result = [
        {
            ticket_id: 0,
            movie_id: 0,
            movie_title: "Movie 1",
            movie_thumbnail: "./resource/no-image.png"
        },
        {
            ticket_id: 1,
            movie_id: 1,
            movie_title: "Movie 2",
            movie_thumbnail: "./resource/no-image.png"
        },
        {
            ticket_id: 2,
            movie_id: 2,
            movie_title: "Movie 3",
            movie_thumbnail: "./resource/no-image.png"
        },
        {
            ticket_id: 3,
            movie_id: 3,
            movie_title: "Movie 4",
            movie_thumbnail: "./resource/no-image.png"
        },
        {
            ticket_id: 4,
            movie_id: 4,
            movie_title: "Movie 5",
            movie_thumbnail: "./resource/no-image.png"
        },
        {
            ticket_id: 5,
            movie_id: 5,
            movie_title: "Movie 6",
            movie_thumbnail: "./resource/no-image.png"
        },
        {
            ticket_id: 6,
            movie_id: 6,
            movie_title: "Movie 7",
            movie_thumbnail: "./resource/no-image.png"
        },
        {
            ticket_id: 7,
            movie_id: 7,
            movie_title: "Movie 8",
            movie_thumbnail: "./resource/no-image.png"
        },
        {
            ticket_id: 8,
            movie_id: 8,
            movie_title: "Movie 9",
            movie_thumbnail: "./resource/no-image.png"
        },
    ];

    let first = true, appending = "", i = 0;
    while (i < result.length) {
        appending += `
              <div class="carousel-item ${(first) ? " active" : ""}">
                <div class="row p-2">
            `;

        for (let j = 1; j <= 3; j += 1) {
            if (i >= result.length) {break;}
            const row = result[i];
            appending += `
                  <div class="col-lg-4 mb-2">
                    <div class="card">
                      <img src="${row.movie_thumbnail}" class="card-img-top" alt="movie-thumbnail"/>
                      <div class="card-body">
                        <h6 class="card-title">${row.movie_title}</h6>
                        <div class="row">
                          <a href="./movie-detail.html?movie-id=${row.movie_id}" class="btn btn-outline-primary col">Detail</a>
                          <a href="./receipt.html?ticket-id=${row.ticket_id}" class="btn btn-outline-secondary col">Receipt</a>
                        </div>
                      </div>
                    </div>
                  </div>
                `;
            i += 1;
        }

        appending += `
                </div>
              </div>
            `;
        first = false;
    }
    $("#purchased-ticket-placeholder").html(appending);
}

$(document).ready(() => {
    getWatchedHistory();
    getPurchasedTicket();
});