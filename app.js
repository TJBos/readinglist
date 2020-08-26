//API KEY
//AIzaSyC17HtqLLefNJ4Fe-zA07LzIHdJndzRra4

//https://www.googleapis.com/books/v1/users/userId/bookshelves/shelf/volumes

//uid=112452514880183692834&as_coll=1001 //where user id and book shelf id is mentioned

//https://www.googleapis.com/books/v1/users/112452514880183692834/bookshelves/1001/volumes

// => working API!!

//response is JSON with array per book item;
//access title: .items[0].volumeInfo.title
//access author: .items[0].volumeInfo.authors[0]



$.ajax({
    url: 'https://www.googleapis.com/books/v1/users/112452514880183692834/bookshelves/1001/volumes'
}).then((response) => {
    
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
        $("#carousel-images").append($newDiv);
        highestIndex++
    }    
    /*console.log(response.items[0].volumeInfo.title);
    console.log(response.items[0].volumeInfo.authors[0]);
    console.log(response.items[1].volumeInfo.title);
    console.log(response.items[1].volumeInfo.authors[0]);
    const image1 = response.items[0].volumeInfo.imageLinks.thumbnail;
    $('#first').append($(`<img src=${image1}>`));
    const image2 = response.items[1].volumeInfo.imageLinks.thumbnail;
    $('#second').append($(`<img src=${image2}>`));
    const image3 = response.items[2].volumeInfo.imageLinks.thumbnail;
    $('#third').append($(`<img src=${image3}>`));
    */ 

})   

////CAROUSEL///
//////////////

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



