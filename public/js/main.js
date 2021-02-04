$(document).ready(function(){
    $('.sidenav').sidenav();
    setPageContent();
});


function setPageContent() {
    checkboxes = [];
    for(let i = 0; i < 10; i++) {
        checkboxes.push(Components.Checkbox(i.toString(), true));
    }

    card = Components.Card("List", "Some items", checkboxes.join(''));
    console.log(card.toString())
    $('.pageContent').html(card);
}