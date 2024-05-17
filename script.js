"use strict";

const container = document.querySelector(".container");
const div = document.querySelector(".test1");
const title = document.querySelector(".element");
const body = document.querySelector(".lists");
const commentContainer = document.querySelector(".comment");
const deleteIcon = document.querySelector(".delete-image");

// const displayPost = function (title, text, comments) {
//   const divCreate = document.createElement("div");
//   container.append(divCreate);
//   const imgElement = document.createElement("img");
//   imgElement.src = "profile.png";
//   divCreate.append(imgElement);
//   const titleCreation = document.createElement("h4");
//   titleCreation.textContent = title;
//   divCreate.append(titleCreation);
//   const bodyCreation = document.createElement("p");
//   bodyCreation.textContent = text;
//   divCreate.append(bodyCreation);
//   const commentText = document.createElement("p");
//   commentText.textContent = "Comments";
//   commentText.classList.add("bold-underline");
//   divCreate.append("Comments");
//   for (let i = 0; i < comments.length; i++) {
//     const commentPara = document.createElement("p");
//     commentPara.textContent = comments[i].body;

//     divCreate.append(commentPara);
//   }
// };

// const getPost = async function () {
//   try {
//     const postResponse = await fetch(
//       "https://jsonplaceholder.typicode.com/posts"
//     );
//     const posts = await postResponse.json();
//     for (let i = 0; i < posts.length; i++) {
//       const post = posts[i];
//       const postId = post.id;
//       const comments = await getComments(postId);
//       console.log(comments);
//       post.comments = comments;
//     }

//     for (let i = 0; i < posts.length; i++) {
//       const post = posts[i];
//       displayPost(post.title, post.body, post.comments);
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

// async function getComments(postId) {
//   const response = await fetch(
//     `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
//   );
//   const comments = await response.json();

//   return comments;
// }

// getPost();

// Using Promise.all

const displayPost = function (title, text, comments) {
  const divCreate = document.createElement("div");
  container.append(divCreate);
  const imgElementDelete = document.createElement("img");
  imgElementDelete.src = "delete.jpg";
  divCreate.append(imgElementDelete);
  imgElementDelete.classList.add("delete");
  imgElementDelete.addEventListener("click", function () {
    console.log("delete");
    divCreate.remove();
  });
  const imgElement = document.createElement("img");
  imgElement.src = "profile.png";
  divCreate.append(imgElement);
  const titleCreation = document.createElement("h4");
  titleCreation.textContent = title;
  divCreate.append(titleCreation);
  const bodyCreation = document.createElement("p");
  bodyCreation.textContent = text;
  divCreate.append(bodyCreation);

  const commentText = document.createElement("p");
  commentText.textContent = "Comments";
  commentText.classList.add("bold-underline");
  divCreate.append(commentText);
  for (let i = 0; i < comments.length; i++) {
    const commentPara = document.createElement("p");
    commentPara.textContent = comments[i].body;
    divCreate.append(commentPara);
  }
};

const getPost = async function () {
  try {
    const postResponse = await fetch(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const posts = await postResponse.json();
    const allComments = [];
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      const postId = post.id;
      const comments = getComments(postId);
      allComments.push(comments);
      post.comments = comments;
    }
    const commentsArrays = await Promise.all(allComments);

    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      const comment = commentsArrays[i];
      displayPost(post.title, post.body, comment);
    }
  } catch (err) {
    console.log(err);
  }
};

async function getComments(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
  );
  const comments = await response.json();

  return comments;
}

getPost();

// -----------------------------------

// const displayComments = function (showComment) {
//   const divForComment = document.createElement("div");
//   container.append(divForComment);
//   const commentElement = document.createElement("p");
//   commentElement.textContent = showComment;
//   divForComment.append(commentElement);
// };

// const getComments = async function (postId) {
//   try {
//     const res = await fetch(
//       `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
//     );
//     const comments = await res.json();

//     for (let i = 0; i < comments.length; i++) {
//       const commentLists = comments[i];
//       displayComments(commentLists.body);
//       // console.log(commentLists);
//       // const divForComment = document.createElement("div");
//       // container.append(divForComment);
//       // const commentElement = document.createElement("u");
//       // commentElement.textContent = commentLists.postId;
//       // divForComment.append(commentElement);
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

// const getPost = async function () {
//   try {
//     const response = await fetch("https://jsonplaceholder.typicode.com/posts");
//     const posts = await response.json();
//     for (let i = 0; i < posts.length; i++) {
//       const newPost = posts[i];
//       displayPost(newPost.title, newPost.body);
//       getComments(newPost.id);
//       // title.textContent = newPost.title;
//       // body.textContent = newPost.body;
//       // commentContainer.addEventListener("click", function () {
//       //   displayComments(newPost.id);
//       // });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };
// getPost();

// old code

// const displayPost = function (showTitle, showText) {
//   const divCreate = document.createElement("div");
//   container.append(divCreate);
//   const imgElement = document.createElement("img");
//   imgElement.src = "profile.png";
//   divCreate.append(imgElement);
//   const titleCreation = document.createElement("h4");
//   titleCreation.textContent = showTitle;
//   divCreate.append(titleCreation);
//   const bodyCreation = document.createElement("p");
//   bodyCreation.textContent = showText;
//   divCreate.append(bodyCreation);
//   //   const commentSection = document.createElement("p");
//   //   commentSection.textContent = showComment;
//   //   divCreate.append(commentSection);
// };

// const getPost = async function () {
//   try {
//     const response = await fetch("https://jsonplaceholder.typicode.com/posts");
//     const posts = await response.json();

//     for (let i = 0; i < posts.length; i++) {
//       const newPost = posts[i];

//       displayPost(newPost.title, newPost.body);
//       //   container.textContent = newPost.title;
//       //   container.textContent = newPost.body;
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

// getPost();
