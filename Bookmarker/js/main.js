// Listener for form submit

document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e){
    //Get Form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;
    
    if(!validateForm(siteName, siteUrl)){
        return false;
    }
    
    var bookmark = {
        name : siteName,
        url : siteUrl
    }
    /*
    //Local Storage Strings
    localStorage.setItem('test', 'Hello world');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'));
    */
    
    if(localStorage.getItem('bookmarks') === null){
        //Init Array
        var bookmarks= [];
        //Adding the taken input(bookmark) to bookmarks array using push
        bookmarks.push(bookmark);
        //Set to local storage because its just a local array now 
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    // if there is already something in the local storage
    else{
        
        // Get the already stored bookmarks from local storage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        
        //Now add the bookmark to the array
        bookmarks.push(bookmark);
        
        //Set it back to the local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    
    //Clear Form
    document.getElementById('myForm').reset();
    
    //Re-fetch the bookmarks
    fetchBookmarks();
    
    // Prevent Form from submitting
    e.preventDefault();
}

//Delete bookmark function
function deleteBookmark(url)
{
    //Get bookmarks from local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    
    //Loop through bookmarks and find the one you want to delete
    for(var i=0; i<bookmarks.length; i++){
        if(bookmarks[i].url == url){
            //Remove the Item
            bookmarks.splice(i,1);
        }
    }
    
    //Set it back to the local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    
    //Re-fetch the bookmarks
    fetchBookmarks();
}


// Fetch Bookmarks

function fetchBookmarks(){
    
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    
    //Get id of html element where we want to display
     var bookmarksResults = document.getElementById('bookmarksResults');
    
    //Build the output now
    bookmarksResults.innerHTML = '';
    for(var i=0; i < bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        
        bookmarksResults.innerHTML +=   '<div class="container">'+
                                        '<div class="jumbotron">' +
                                        '<h3>'+name+
                                        '<a class="btn btn-info text-right" target="_blank" href="'+url+'">Visit</a>'+
                                        '<a onclick="deleteBookmark(\''+url+'\')"class="btn btn-danger text-right" href="#">Delete</a>'+
                                        '</h3>'+    
                                        '</div>'+
                                        '</div>';
    }
}

// Validate Form
function validateForm(siteName, siteUrl){
  if(!siteName || !siteUrl){
    alert('Please fill in the form');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!siteUrl.match(regex)){
    alert('Please use a valid URL');
    return false;
  }

  return true;
}