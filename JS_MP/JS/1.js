// В index.html
// 1 отримати масив об'єктів з endpoint`а https://jsonplaceholder.typicode.com/users
// 2 Вивести id,name всіх user в index.html. Окремий блок для кожного user.
// 3 Додати кожному блоку кнопку/посилання , при кліку на яку відбувається перехід  на сторінку user-details.html, котра має детальну інфорацію про об'єкт на який клікнули
//
//
// На странице user-details.html:
// 4 Вивести всю, без виключення, інформацію про об'єкт user на який клікнули
// 5 Додати кнопку "post of current user", при кліку на яку, з'являються title всіх постів поточного юзера
// (для получения постов используйте эндпоинт https://jsonplaceholder.typicode.com/users/USER_ID/posts)
//   6 Каждому посту додати кнопку/посилання, при кліку на яку відбувається перехід на сторінку post-details.html, котра має детальну інфу про поточний пост.
//
//   На странице post-details.html:
// 7 Вивести всю, без виключення, інформацію про об'єкт post на який клікнули .
// 8 Нижчє інформаці про пост, вивести всі коментарі поточного поста (ендпоінт  - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)
//
// Стилизація проєкта -
// index.html - всі блоки з user - по 2 в рядок. кнопки/аосилвння розташувати під інформацією про user.
//   user-details.html - блок з інфою про user зверху сторінки. Кнопка нижчє, на 90% ширини сторінки, по центру.
//   блоки з короткою іфною про post - в ряд по 5 .
//   post-details.html - блок з інфою про пост зверху. Коментарі - по 4 в ряд.
//   Всі елементи котрі характеризують users, posts, comments візуалізувати, так,) щоб було видно що це блоки (дати фон. марджини і тд)


const usersList = document.getElementById('users_list');
if (usersList) {

  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => {
      for (const user of users) {
        let userInfo = document.createElement('li');
        let userButton = document.createElement('Button');
        userButton.innerHTML = 'User details';
        userButton.onclick = function () {
          location.href = `user-details.html?id=${user.id}`;
        }
        userInfo.classList.add('userItem');
        userInfo.innerText = `${user.id} ${user.name}`;
        userInfo.append(userButton);
        usersList.append(userInfo);
      }
    })
}

const userDetailsContainer = document.getElementById('users_details');
const usersDetailsList = document.getElementById('users_details_list');
 const postsList = document.getElementById('posts_list');
if (userDetailsContainer) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');
  fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then(response => response.json())
    .then(userDetails => {
      let userPostsButton = document.createElement('Button');
      userPostsButton.innerHTML = 'Posts of current user';
      userPostsButton.classList.add('user-posts-button');
      userPostsButton.onclick = function () {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
          .then(response => response.json())
          .then(posts => {
            for (const post of posts) {
              let postTitle = document.createElement('li');
              postTitle.classList.add('post-item');
              postTitle.innerText = post.title;
              let postButton = document.createElement('Button');
              postButton.innerHTML = 'Post details';
              postButton.onclick = function(){
                location.href = `post-details.html?id=${id}&post_id=${post.id}`;
              };
              postTitle.append(postButton);
              postsList.append(postTitle);
            }})
          this.classList.add('hidden');
      }
      function print(details){
        let userDetailsList = [];
        for (let key in details){
          if (typeof(details[key]) == 'object'){

            userDetailsList.push(... print(details[key]));

          } else {
            let userInfoItem = document.createElement('li');
            let userInfoItemText = document.createTextNode(`${key}: ${details[key]}`);
            userInfoItem.appendChild(userInfoItemText);
            userDetailsList.push(userInfoItem);
          }
        }
        return userDetailsList;
      }
      usersDetailsList.append(...print(userDetails));
       userDetailsContainer.append(userPostsButton);
    })
}
const detailsPostContainer = document.getElementById('post_details');
const commentsList = document.getElementById('comments_list');
const commentsDetailsList = document.getElementById('comments_details_list');
 if (detailsPostContainer) {
   const queryString = window.location.search;
   const urlParams = new URLSearchParams(queryString);
   const id = urlParams.get('id');
   const postId = urlParams.get('post_id');

   fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
     .then(response => response.json())
     .then(posts => {

       for (const post of posts){
         let postInfoContainer = [];
         let commentsPostButton = "";
         if (post.id == postId) {
           for (let key in post) {
             let postParagraph = document.createElement('div');
             let postParagraphText = document.createTextNode(key + ':' + post[key]);
             postParagraph.appendChild(postParagraphText);
             postInfoContainer.push(postParagraph);
             commentsList.classList.add('comments-list');
           }
           commentsPostButton = document.createElement('Button');
           commentsPostButton.innerHTML = 'Post comments';
           commentsPostButton.onclick = function () {
             fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
               .then(response => response.json())
               .then(comments => {
                 for (const comment of comments) {
                  let commentItem =  document.createElement('li');
                   let commentInfoContainer = [];
                   for (let key in comment) {
                     let postParagraph = document.createElement('div');
                     let postParagraphText = document.createTextNode(key + ':' + comment[key]);
                     postParagraph.appendChild(postParagraphText);
                     commentInfoContainer.push(postParagraph);
                   }
                   commentItem.append(...commentInfoContainer);
                   commentsList.append(commentItem);
                   this.classList.add('hidden');
                 }
               })
           }
           commentsDetailsList.append(...postInfoContainer);
           detailsPostContainer.append(commentsPostButton);

         }

       }})

 }

