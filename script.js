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

const displayPost = function (title, text, comments, postId) {
  const divCreate = document.createElement("div");
  container.append(divCreate);

  // Add delete in old div

  const imgElementDelete = document.createElement("img");
  imgElementDelete.src = "delete.jpg";
  divCreate.append(imgElementDelete);
  imgElementDelete.classList.add("delete");
  imgElementDelete.addEventListener("click", function () {
    deletePosts(postId);
    divCreate.remove();
  });
  // Add post icon in old div
  const imgAddPost = document.createElement("img");
  imgAddPost.src = "add-icon.jpeg";
  divCreate.append(imgAddPost);
  imgAddPost.classList.add("add");

  // Edit posts
  const imgEditPost = document.createElement("img");
  imgEditPost.src = "images.png";
  divCreate.append(imgEditPost);
  imgEditPost.classList.add("edit");
  // Add profile picture , title  and body to old div
  const imgElement = document.createElement("img");
  imgElement.src = "profile.png";
  divCreate.append(imgElement);
  const titleCreation = document.createElement("h4");
  titleCreation.textContent = title;
  divCreate.append(titleCreation);
  const bodyCreation = document.createElement("p");
  bodyCreation.textContent = text;
  divCreate.append(bodyCreation);

  // actions on edit
  imgEditPost.addEventListener("click", async function () {
    // debugger;
    const returnedValEdit = await editPosts(postId);
    titleCreation.textContent = "";
    // debugger;
    titleCreation.textContent = returnedValEdit.titleForEdit;
    // divCreate.append(titleCreation);
    bodyCreation.textContent = "";
    bodyCreation.textContent = returnedValEdit.bodyForEdit;
    // divCreate.append(bodyCreation);
  });

  // const imgElement = document.createElement("img");
  // imgElement.src = "profile.png";
  // divCreate.append(imgElement);
  // const titleCreation = document.createElement("h4");
  // titleCreation.textContent = title;
  // divCreate.append(titleCreation);
  // const bodyCreation = document.createElement("p");
  // bodyCreation.textContent = text;
  // divCreate.append(bodyCreation);

  // New div add
  imgAddPost.addEventListener("click", async function () {
    const returnedVal = await addPosts();
    debugger;
    displayPost(
      returnedVal.newTitle,
      returnedVal.newBody,
      [],
      returnedVal.postId
    );
    // const divCreatePost = document.createElement("div");
    // container.append(divCreatePost);
    // //  Delete user created div
    // const imgElementDelete = document.createElement("img");
    // imgElementDelete.src = "delete.jpg";
    // divCreatePost.append(imgElementDelete);
    // imgElementDelete.classList.add("delete");
    // imgElementDelete.addEventListener("click", function () {
    //   deletePosts(postId);
    //   divCreatePost.remove();
    // });
    // // Add post manually
    // const imgAddPost = document.createElement("img");
    // imgAddPost.src = "add-icon.jpeg";
    // divCreatePost.append(imgAddPost);
    // imgAddPost.classList.add("add");
    // imgAddPost.addEventListener("click", async function () {
    //   const returnedVal = await addPosts();
    //   displayPost(returnedVal.newTitle, returnedVal.newBody, comments, postId);
    // });
    // const editImage = document.createElement("img");
    // editImage.src = "images.png";
    // divCreatePost.append(editImage);
    // editImage.classList.add("edit");
    // const imgElement = document.createElement("img");
    // imgElement.src = "profile.png";
    // divCreatePost.append(imgElement);

    // const returnedVal = await addPosts();
    // console.log(returnedVal.newTitle);
    // const titleCreation = document.createElement("h4");

    // titleCreation.textContent = returnedVal.newTitle;
    // divCreatePost.append(titleCreation);
    // const bodyCreation = document.createElement("p");
    // bodyCreation.textContent = returnedVal.newBody;
    // divCreatePost.append(bodyCreation);
  });

  // Comments
  if (comments.length) {
    const commentText = document.createElement("p");
    commentText.textContent = "Comments";
    commentText.classList.add("bold-underline");
    divCreate.append(commentText);
    for (let i = 0; i < comments.length; i++) {
      const commentPara = document.createElement("p");
      commentPara.textContent = comments[i].body;
      divCreate.append(commentPara);
    }
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
      displayPost(post.title, post.body, comment, post.id);
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

async function deletePosts(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );
  const deleteResponse = await response.json();
  return deleteResponse;
}

async function addPosts() {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
      method: "POST",
      body: JSON.stringify({
        title: "Here is my new title",
        body: "Body data is here",
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const addResponse = await response.json();

    return {
      newTitle: addResponse.title,
      newBody: addResponse.body,
      postId: addResponse.id,
    };
  } catch (err) {
    console.log(err);
  }
}

async function editPosts(postId) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`,
      {
        method: "PUT",
        body: JSON.stringify({
          id: postId,
          title: "Updated Title",
          body: "Updated Body",
          userId: 1,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    const resultEdit = await response.json();

    return {
      titleForEdit: resultEdit.title,
      bodyForEdit: resultEdit.body,
    };
  } catch (err) {
    console.log(err);
  }
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
