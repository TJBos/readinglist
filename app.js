//API KEY
//AIzaSyC17HtqLLefNJ4Fe-zA07LzIHdJndzRra4


//each clickable category (tabs) corresponds to a Bookshelf on Google Books;
//1001 is "software"
//1002 is "science fiction"
//1003 is non-fiction
//1004 is fiction

//we're querying one bookshelf at a time;
//response is JSON; array of objects; each object corresponds to 1 book;


//----------------------------------------------------------------------
//AJAX call to populate all data from Google Books bookshelves API///
//---------------------------------------------------------------------- 

//The carousel will populate when a genre tab is clicked
$('.genre').on("click", (event) => {
    
    //Reset everything
    $('.genre').css('background-color', 'white');
    $('#carousel-images').empty();
    highestIndex = -1;
    currentImgIndex = 0;
    //Change color when clicked
    $(event.target).css('background-color', 'lightgrey');
    //choose the right category (bookshelf ID) for the URL
    const category = $(event.target).attr('id');
    
    //AJAX request to URL
    $.ajax({
        url: `https://www.googleapis.com/books/v1/users/112452514880183692834/bookshelves/${category}/volumes`
    }).then((response) => {
        
        //Make a new div for each book on the bookshelf, populating data for the author, title, image and description from Google Books
        for (item of response.items) {
            const $newDiv = $('<div class="book">');
            const image = item.volumeInfo.imageLinks.thumbnail;
            $newDiv.append($(`<img src=${image}>`));
            const title = item.volumeInfo.title;
            const author = item.volumeInfo.authors[0];
            const description = item.volumeInfo.description;
            const $newBookInfoDiv = $('<div class="book-info">');
            $newBookInfoDiv.append($('<h3>').text(title))
                           .append($('<h4>').text(author))
                           .append($('<p>').text(description));
            $newDiv.append($newBookInfoDiv);
            $newBookInfoDiv.wrap(`<a href=${item.volumeInfo.infoLink} target="_blank"></a>`);
            $("#carousel-images").append($newDiv);
            highestIndex++
        }    
        
    })   

});


//The carousel slider will slide through all books on the particular bookshelf
//-------------
//CAROUSEL
//-------------

let currentImgIndex = 0;
let highestIndex = -1;

$("#next").on("click", () => {
    $('#carousel-images').children().eq(currentImgIndex).css('display', 'none');
    if (currentImgIndex < highestIndex) {
        currentImgIndex++ 
    } else {
        currentImgIndex = 0;
    }

    $('#carousel-images').children().eq(currentImgIndex).css('display', 'flex');


});

$("#previous").on("click", () => {
    $('#carousel-images').children().eq(currentImgIndex).css('display', 'none');
    if (currentImgIndex > 0) {
        currentImgIndex-- 
    } else {
        currentImgIndex = highestIndex;
    }

    $('#carousel-images').children().eq(currentImgIndex).css('display', 'flex');


});

//On page load, populate carousel with first tab open

$('.genre:first-of-type').trigger('click');



