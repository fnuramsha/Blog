"use strict";

const displayPost = function (showData) {};

const getPost = async function () {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await response.json();
    // console.log(posts);
    for (let i = 0; i < posts.length; i++) {
      const newPost = posts[i];
      console.log(newPost.title, newPost.body);
    }
  } catch (err) {
    console.log(err);
  }
};

getPost();
