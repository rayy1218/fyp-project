$(document).ready(() => {
    let modal_html = `
      <div class="modal fade" id="prototype-navi-modal" tabindex="-1" aria-labelledby="prototype-navi-modal-title" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="prototype-navi-modal-title">Prototype Tool</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>  
            </div>
            <div class="modal-body">
              <div class="fw-bold mb-3">Navigation</div>
              <div class="border-top border-bottom">
                <div><a class="btn btn-outline-primary mb-3 w-100" href="/index.html">Home</a></div>
                <div><a class="btn btn-outline-primary mb-3 w-100" href="/src/register.html">Register</a></div>
                <div><a class="btn btn-outline-primary mb-3 w-100" href="/src/login.html">Login</a></div>
                <div><a class="btn btn-outline-primary mb-3 w-100" href="/src/dashboard.html">User Dashboard</a></div>
                <div><a class="btn btn-outline-primary mb-3 w-100" href="/src/dashboard1-employee.html">Employee Dashboard(Schedule)</a></div>
                <div><a class="btn btn-outline-primary mb-3 w-100" href="/src/dashboard2-employee.html">Employee Dashboard(Movie List)</a></div>
                <div><a class="btn btn-outline-primary mb-3 w-100" href="/src/dashboard3-employee.html">Employee Dashboard(Cinema&Theater)</a></div>
                <div><a class="btn btn-outline-primary mb-3 w-100" href="/src/movie-list.html">Movie List</a></div>
                <div><a class="btn btn-outline-primary mb-3 w-100" href="/src/movie-detail.html">Movie Detail</a></div>
                <div><a class="btn btn-outline-primary mb-3 w-100" href="/src/ticket-purchase.html">Purchase(Query Scheduled Movie)</a></div>
                <div><a class="btn btn-outline-primary mb-3 w-100" href="/src/seat-selecting.html">Purchase(Seat Selecting)</a></div>
                <div><a class="btn btn-outline-primary mb-3 w-100" href="/src/payment.html">Purchase(Payment)</a></div>
                <div><a class="btn btn-outline-primary mb-3 w-100" href="/src/receipt.html">Purchase(Receipt)</a></div>
              </div>
              <div class="fw-bold my-3">Set user status</div>
              <div class="border-top">
                <div><button class="btn btn-outline-primary mb-3 w-100 set-user-btn" value="guest">Guest</button></div>
                <div><button class="btn btn-outline-primary mb-3 w-100 set-user-btn" value="member">Member</button></div>
                <div><button class="btn btn-outline-primary mb-3 w-100 set-user-btn" value="employee">Employee</button></div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    `;

   $("body").append(modal_html);

   let navi_modal = new bootstrap.Modal(document.getElementById('prototype-navi-modal'));

   $(document).keyup((event) => {
      if( event.which === 90 && event.ctrlKey && event.shiftKey ){
         navi_modal.show();
      }
   });

   $(".set-user-btn").click((event) => {
       window.sessionStorage.setItem("status", event.target.value);
       window.location.reload();
   });
});