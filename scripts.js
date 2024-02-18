const apiKey = process.env.NEWS_API_KEY;
const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

const categories = {
    "general": `https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=${apiKey}`,
    "business": `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`,
    "sports": `https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=${apiKey}`,
    "health": `https://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=${apiKey}`,
    "science": `https://newsapi.org/v2/top-headlines?country=us&category=science&apiKey=${apiKey}`,
    "technology": `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${apiKey}`,
    "entertainment": `https://newsapi.org/v2/top-headlines?country=us&category=entertainment&apiKey=${apiKey}`  
}

document.getElementById('general').addEventListener('click', () => fetchByCategory('general'));
document.getElementById('business').addEventListener('click', () => fetchByCategory('business'));
document.getElementById('sports').addEventListener('click', () => fetchByCategory('sports'));
document.getElementById('health').addEventListener('click', () => fetchByCategory('health'));
document.getElementById('science').addEventListener('click', () => fetchByCategory('science'));
document.getElementById('technology').addEventListener('click', () => fetchByCategory('technology'));
document.getElementById('entertainment').addEventListener('click', () => fetchByCategory('entertainment'));

async function fetchNews(){
    try{
        let response = await fetch(url);
        let data = await response.json();
        console.log(data);
        displayNews(data.articles)
    }catch(error){
        console.error('there was an error!', error);
    }

}

fetchNews()

async function fetchByCategory(category){
    const articleDiv = document.getElementById('article-tree');
    while(articleDiv.firstChild){
        articleDiv.removeChild(articleDiv.firstChild)
    }//This is still a work in progress, looking for a way to clear all of the containers child nodes before displaying a new set of cards, however the display function depends on there being a 'sample card' in order to use the cloneNode(true) method;
    try{
        let response = await fetch(categories[category]);
        let data = await response.json();
        console.log(data);
        displayNews(data.articles);
    }catch(error){
        console.error('There was an error!', error);
    }
}

function displayNews(articles){
    // const newsDiv = document.getElementById('news');
    const articleTree = document.getElementById('article-tree');
    const articleCard = document.querySelector('.col-4');
    for(const article of articles){
        const newCard = articleCard.cloneNode(true);
        newCard.removeAttribute('id');
        const articleImg = newCard.querySelector('img');
        articleImg.src = article.urlToImage;
        articleImg.alt = 'article image';
        const articleDescription = newCard.querySelector('#card-description');
        articleDescription.textContent = article.description;
        const readMore = newCard.querySelector('a');
        readMore.href = article.url;
        readMore.textContent = article.title;
        articleTree.appendChild(newCard);
    }
}

