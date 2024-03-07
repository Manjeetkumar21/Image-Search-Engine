const searchForm = document.querySelector('#search-form');
const searchBox = document.querySelector('#search-input');
const searchResult = document.querySelector('#search-result');
const showMore = document.querySelector('#show-more');
const accessKey = 'kYGiANeNWH5-L-NAgTwcZEkjKAhWJubsJuQOiVR7UR0'
let keyword = "";
let page = 1;

async function searchImage(resolve, reject){
    try{
        keyword = searchBox.value
        const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

        const response = await axios.get(url);
        const results = response.data.results;

        if(page===1){
            searchResult.innerHTML = ""
        }

        results.map((result)=>{
            const Image = document.createElement('img')
            Image.src = result.urls.small;
            const ImageLink = document.createElement('a')
            ImageLink.href = result.links.html;
            ImageLink.target = "_blank"

            ImageLink.append(Image);
            searchResult.append(ImageLink)

            // searchResult.innerHTML = `
            // <a href="${result.links.html}" target="_blank">
            //         <img src="${result.urls.small}" alt="${keyword}">
            //     </a>`
        })

        document.querySelector('p').innerHTML = `Showing results for <i><b>${keyword}</b></i>`

        console.log(resolve);
    }
    catch(err){
        console.log("Error");
        console.log(reject);
    }

    showMore.style.display = "block"
}

searchForm.addEventListener('submit', function(event){
    event.preventDefault();

    page = 1;
    searchImage();
})

showMore.addEventListener("click", function(){
    page++;
    searchImage();
})