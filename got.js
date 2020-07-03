// var chars = "https://www.anapioficeandfire.com/api/characters?page=43&pageSize=50";

// //2133 Chracters
// fetch(chars)
//     .then(response => response.json())
//     .then(data => {
//         console.log(data);
        

//     })
//     .catch(error => {
//         console.log(error);
//     }) 

$(function () {
    let pageNum = 0; //********* YOU NEED THIS ************
    let charArray = []
    function getNames(pageNum) { //*********** WRAP YOUR API CALL IN A FUNCTION *************
        $.get("https://www.anapioficeandfire.com/api/characters?page=" + pageNum + "&pageSize=50")
            .done(function (response) {
                if (response.length > 0) { //****** TEST LENGTH OF RESPONSE *******
                    pageNum++;  // *****INCREMENT YOUR PAGE COUNT. *********
                    console.log(pageNum);
                    console.log(response);
                    hasNameArray = response.filter(char => char.name != "")

                    charArray.push(...hasNameArray)
                    for(let char of hasNameArray){
                        $('#nameList').append(`<li><a href="#">${char.name}</a></li>`)
                       
                    }
                    getNames(pageNum);  // ******. CALL THE FUNCTION AGAIN RECURSIVELY 
                }
            })
            .fail(function (error) {
                console.log(error);
            })
            console.log(charArray)
    }
    getNames(pageNum);


    $('#searchField').keyup(function () {
        let input = document.getElementById('searchField');
        let filter = input.value.toUpperCase();
        let ul = document.getElementById("nameList");
        let li = ul.getElementsByTagName('li');
      
        // Loop through all list items, and hide those who don't match the search query
        for (let i = 0; i < li.length; i++) {
          let a = li[i].getElementsByTagName("a")[0];
          let txtValue = a.textContent || a.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
          } else {
            li[i].style.display = "none";
          }
        }
      });
    
})
