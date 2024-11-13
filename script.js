const apiKey="23bc585848de469cac02f7f432da619f";

const blogContainer =document.getElementById("bolg-container");
const searchField=document.getElementById("search-engine");
const searchButton=document.getElementById("button");
async function fetchRandomNews(){
    try{
        const apiUrl =`https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apikey=${apiKey}`;
     const response=await fetch(apiUrl);
     const result= await response.json();
    return result.articles;
    } catch(error){
        console.error("error fetching random news",error);
        return [];
    }
}
searchButton.addEventListener("click",async function(){
    let query=searchField.value;
    if(query!==""){
        try{
            const articles =await fetchNewsQuery(query);
            displayBlogs(articles);
        } catch(error){
            console.log("error in fetching",error)
        }
    }
});
async function fetchNewsQuery(query){
    try{
        const apiUrl =`https://newsapi.org/v2/everything?q=${query}&pageSize=10&apikey=${apiKey}`;
     const response=await fetch(apiUrl);
     const result= await response.json();
     console.log(result.articles);
    return result.articles;
    } catch(error){
        console.error("error fetching random news",error);
        return [];
    }
}
function displayBlogs(articles){
    blogContainer.innerHTML =""
    articles.forEach((article) =>{
        const blogCard =document.createElement("div");
       blogCard.classList.add("blog-card");
       const img = document.createElement("img");
       img.src=article.urlToImage;
       img.alt=article.title;
       const title=document.createElement("h2");
       const truncatedTitle =article.title.length>30?article.title.slice(0,30)+".....":article.title;
       title.textContent=truncatedTitle;
       const description=document.createElement("p");
       const truncatedesc =article.description.length>120?article.description.slice(0,120)+".....":article.description;
     description.textContent=truncatedesc;
    //    description.textContent=article.description;
       
       blogCard.appendChild(img);
       blogCard.appendChild(title);
       blogCard.appendChild(description);
       blogCard.addEventListener("click",()=>{
        window.open(article.url,"_blank");
       });
       blogContainer.appendChild(blogCard);
    });
}
(async ()=>{
    try{
        const articles= await fetchRandomNews();
        displayBlogs(articles);
    }
    catch(error){
        console.log("error fetching random news",error);
    }
})();