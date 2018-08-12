document.getElementById("myForm").addEventListener("submit",saveBookmark);

function saveBookmark(e){

    var siteName = document.getElementById("siteName").value;
    var siteUrl = document.getElementById("siteUrl").value;


    if(!validateForm(siteName, siteUrl)){
        return false;
      }
      
    var bookMark = {
        name: siteName,
        url: siteUrl
    }

    // local storage only store string

    // localStorage.setItem('test',"hello there");
    // console.log(localStorage.getItem("test"));
    // localStorage.removeItem('test');
    // console.log(localStorage.getItem("test"));

    if(localStorage.getItem('bookmarks') === null){
        var bookmarks = [];
        bookmarks.push(bookMark);
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    } else {
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookMark);
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }
    
   // Clear form
   document.getElementById('myForm').reset();

   // Re-fetch bookmarks
   fetchBookmarks();
 
   // Prevent form from submitting
   e.preventDefault();
}



function deleteBookmark(url){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for(var i=0 ; i<bookmarks.length; i++){
        if(bookmarks[i].url === url){
            bookmarks.splice(i,1);
        }
    }
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    fetchBookmarks();
}

function fetchBookmarks(){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    var bookmarksResults = document.getElementById('bookmarkResults');
    bookmarksResults.innerHTML = '';
    for(var i=0; i<bookmarks.length;i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        bookmarksResults.innerHTML += '<div class="well">'+
                                    '<h3>'+name+
                                    ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
                                    ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> '+
                                    '</h3>'+
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
  
