const postContainer = document.getElementById('post-container')
const loading = document.querySelector('.loader')
const filterInput = document.getElementById('filter')

let limit = 6
let page = 1

// FETCH POSTS FROM API
async function getPosts() {
    // url needs to be inside function
    const apiURL = `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`

    const res = await fetch(apiURL)
    const data = await res.json()

    return data
}

// SHOW POSTS IN DOM
async function showPosts() {
    const posts = await getPosts()

    console.log(posts)

    posts.forEach(post => {
        const postEl = document.createElement('div')
        postEl.classList.add('post')
        postEl.innerHTML = `
          <div class="number">${post.id}</div>
            <div class="post-info">
            <h2 class="post-title">${post.title}</h2>
                <p class="post-body">
                    ${post.body}
                </p>
           </div>
        `

        postContainer.appendChild(postEl)
    });
}

// SHOW INITIAL POSTS
showPosts()

// SHOW LOADER AND FETCH MORE POSTS
function showLoading() {
    loading.classList.add('show')

    setTimeout(() => {
        loading.classList.remove('show')

        setTimeout(() => {
            page++
            showPosts()
        }, 300);

    }, 1000);
}

// FILTER POSTS BY INPUT
function filterPosts(e) {
    const searchTerm = e.target.value.toUpperCase()
    // console.log(searchTerm)
    const posts = document.querySelectorAll('.post')

    posts.forEach(post => {
        const title = post.querySelector('.post-title').innerText.toUpperCase()
        // console.log(title)
        const body = post.querySelector('.post-body').innerText.toUpperCase()

        if (title.includes(searchTerm) || body.includes(searchTerm)) {
            post.style.display = 'flex'
        }
        else {
            console.log('false')
            post.style.display = 'none'
        }
    })
}

// CHECKED TO SEE IF USER SCROLLED TO BOTTOM OF THE PAGE
window.addEventListener('scroll', () => {

    // moving from the top of page
    // console.log(document.documentElement.scrollTop)

    // height of minimum display height that needs to be in order to FIT all content of page without using vertical scroll
    // console.log(document.documentElement.scrollHeight)

    // height of page on screen
    // console.log(document.documentElement.clientHeight)

    const { scrollTop, scrollHeight, clientHeight } = document.documentElement


    // if moving from scroll top + inner height of screen is greater then complete height of content
    if (scrollTop + clientHeight >= scrollHeight - 5) {
        showLoading()
    }
})

filterInput.addEventListener('input', filterPosts)