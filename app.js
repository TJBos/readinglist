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
    console.log(response.items[0].volumeInfo.title);
    console.log(response.items[0].volumeInfo.authors[0]);
    console.log(response.items[1].volumeInfo.title);
    console.log(response.items[1].volumeInfo.authors[0]);
    const image = response.items[1].volumeInfo.imageLinks.thumbnail;
    $('#book').append($(`<img src=${image}>`));
})

