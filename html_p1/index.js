function openTicketBox() {
    document.getElementById("ticketModal").style.display = "block";

}
function closeModal() {
    document.getElementById("ticketModal").style.display = "none";
}
function toggleMenu() {
    var x = document.getElementsByClassName("header-li-item");
    var xx = document.getElementsByClassName("header-li-item")[0];

    var i;
    if (xx.style.display == "none") {
        for (i = 0; i < x.length; i++) {
            x[i].style.display = 'block';
        }
        document.getElementById("content").style.marginTop = "240px";
    }
    else if (xx.style.display == "block") {
        for (i = 0; i < x.length; i++) {
            x[i].style.display = 'none';
        }
        document.getElementById("content").style.marginTop = "46px";
    }
}