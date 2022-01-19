function getMovieList() {
    let result;

    $.ajax({
        url: "movie-list-employee.php",
        success: (response) => {
            result = JSON.parse(response)
        },
    })

    //This reassignment of result is for prototype showcase use
    result = [
        {
            movie_id: 0,
            movie_title: "Movie 1",
            movie_duration: 120,
        },
        {
            movie_id: 1,
            movie_title: "Movie 2",
            movie_duration: 120,
        },
        {
            movie_id: 2,
            movie_title: "Movie 3",
            movie_duration: 120,
        },
        {
            movie_id: 3,
            movie_title: "Movie 4",
            movie_duration: 120,
        },
        {
            movie_id: 4,
            movie_title: "Movie 5",
            movie_duration: 120,
        },
        {
            movie_id: 5,
            movie_title: "Movie 6",
            movie_duration: 120,
        },
        {
            movie_id: 6,
            movie_title: "Movie 7",
            movie_duration: 120,
        },
        {
            movie_id: 7,
            movie_title: "Movie 8",
            movie_duration: 120,
        },
    ];

    let append = "";
    for (let row of result) {
        append += `
            <li class="list-group-item">
                <div class="row">
                    <div class="col">
                        <p class="fw-bold m-0">${row.movie_title}</p>
                        <div class="row">
                          <div class="col-auto">Duration</div>
                          <div class="col">${row.movie_duration} minutes</div>
                        </div>
                    </div>
                    <div class="col-auto">
                        <button class="btn btn-primary w-100" data-bs-movie-id="${row.movie_id}">Edit</button>
                        <br/>
                        <button class="btn btn-primary w-100 mt-2" data-bs-movie-id="${row.movie_id}">Delete</button>
                        <br/>
                        <button class="btn btn-primary w-100 mt-2" data-bs-toggle="modal" data-bs-target="#schedule-add-movie-modal" data-bs-movie-id="${row.movie_id}">
                          Add to Schedule
                        </button>
                    </div>
                </div>
            </li>
        `;
    }

    $("#movie-list").html(append);
}

$(document).ready(() => {
   getMovieList();
    const add_movie_modal = $("#schedule-add-movie-modal");
    add_movie_modal.on('show.bs.modal', (event) => {
        const movie_id = event.relatedTarget.getAttribute('data-bs-movie-id');
        $(".movie-id-field").val(movie_id);
    })
});