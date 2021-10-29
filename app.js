/**
 * https://getbootstrap.com/docs/5.1/components/navs-tabs/

 На странице в левой части постоянный список пользователей.
 В правой части отображены ссылки-табуляторы "Полная информация", "Задачи", "Посты", "Фотоальбомы"
 При клике на ссылку-табулятор соответствующая информация отображается на экране, а все остальные не видны
 При смене пользователя, с песочницы получаем всю его необходимую информацию, а вкладка "Информация" автоматически активируется
 */
/*  Full Info, Tasks, Posts, Albums */

/*
1. Create Arrays: users, tasks, posts, albums
3. Main function
2. users: Fetch users;
Render users + create div + eventListener.
 */
const userList = document.querySelector('#userList')
const tabs = document.querySelector('#tabs')
const infoBox = document.querySelector('#infoBox')


let users = []
let tasks = []
let posts = []
let albums = []
let activeUser = null

const URL = 'https://jsonplaceholder.typicode.com'

/**
 * we take users from URL/users
 * https://jsonplaceholder.typicode.com/users
 */

const fetchUsers = async () => {
    try {
        const response = await fetch(`${URL}/users`)
        const data = await response.json()
        users = data
    } catch (e) {
        console.log(e)
    }
    renderUsers();
}

const renderUsers = () => {
    users.forEach(user => {
        const userEle = document.createElement('div')
        userEle.className = 'left-item'
        userEle.textContent = user.name
        userEle.addEventListener('click', () => {

            selectUser(user)
        })
        userList.append(userEle)
    })
}
const selectUser = (user) => {
    activeUser = user
    // console.log(JSON.stringify(user))
    renderFullInfo()
    fetchAlbums(user.id)
    fetchPosts(user.id)
    fetchTasksByUser(user.id)
}

const renderFullInfo = () => {
    infoBox.innerHTML=''
    const userInfo = document.createElement('div');
    infoBox.append(userInfo);
    userInfo.innerHTML = `
    <h2>${activeUser.name}</h2>
    <p>${activeUser.username}</p>
    <p>${activeUser.email}</p>
    <p>${activeUser.address.street}, ${activeUser.address.suite}, ${activeUser.address.city}, ${activeUser.address.zipcode}</p>
    `;
}

/**
 * tasks
 */
const fetchTasksByUser = async (userId) => {
    try {
        const response = await fetch(`${URL}/todos?userId=${userId}`)
        tasks = await response.json()
    } catch (e) {
        console.log(e)
    }
}

const renderTasksByUser = () => {
    infoBox.innerHTML =''
    tasks.forEach(task => {
        const taskEle = document.createElement('div')
        taskEle.className = 'right-item'
        taskEle.textContent = task.title
        infoBox.append(taskEle)
    })
}

/**
 *
 * posts
 */
const fetchPosts = async (userId) => {
    try {
        const response = await fetch(`${URL}/posts?userId=${userId}`)
        posts = await response.json()
    } catch (e) {
        concole.log(e)
    }
}
/**
 *
 * albums
 */

const fetchAlbums = async (userId) => {
    try {
        const response = await fetch(`${URL}/albums?userId=${userId}`)
        albums = await response.json()
    } catch (e) {
        console.log(e)
    }
}

tabs.addEventListener('click', (event) => {
    event.preventDefault()
    if (!activeUser) return
    tabs.querySelectorAll('a').forEach(link =>{
        link.classList.remove('active')
    })
    event.target.classList.add('active')
    switch (event.target.id) {
        case "taskLink":
            renderTasksByUser()
            break
        case "fullInfoLink":
            renderFullInfo()
            break
        default:
            return
    }

})

const main = () => {
    fetchUsers()
}

main()
