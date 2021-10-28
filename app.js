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

const URL = 'https://jsonplaceholder.typicode.com'

/**
 * we take users from URL/users
 * https://jsonplaceholder.typicode.com/users
 */

const fetchUsers = async () => {
    try {
        const response = await fetch('${URL}/users')
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
            // alert(JSON.stringify(user))
            // console.log(JSON.stringify(user))
            //
            // const selectUser = (user) => {
            //     console.log(JSON.stringify(user))
            // }
            selectUser(user)
        })
        // const userList = document.getElementById('userList')
        userList.append(userEle)
    })
}
const selectUser = (user) => {
    console.log(JSON.stringify(user))
}


/**
 * tasks
 */
const fetchTasksByUser = async (userId) => {
    try {
        const response = await fetch('${URL}/todos?userId=${userId}')
        posts = await response.json()
        tasks = tasksList
    } catch (e) {
        console.log(e)
    }
}


const renderTasksByUser = () => {
    tasksList.forEach(task => {
        const taskEle = document.createElement('div')
        taskEle.className = 'right-item'
        taskEle.textContent = task.title
        taskEle.addEventListener('click', () => {
            let selectTask = (task)
        })
        const tabs = document.getElementById('tabs')
        tabs.append(taskEle)
    })
}
const selectTask = (task) => {
}

/**
 *
 * posts
 */
const fetchPosts = async (userId) => {
    try {
        const response = await fetch('${URL}/posts?userId=${userId}')
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
        const response = await fetch('${URL}/albums?userId=${userId}')
        albums = await response.json()
    } catch (e) {
        console.log(e)
    }
}


const main = () => {
    fetchUsers()
}

main()
