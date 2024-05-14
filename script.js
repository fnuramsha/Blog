"use strict";

const container = document.querySelector(".container");
const title = document.querySelector(".element");
const body = document.querySelector(".lists");

const displayPost = function (showTitle, showText) {
  const divCreate = document.createElement("div");
  container.append(divCreate);
  const imgElement = document.createElement("img");
  imgElement.src = "profile.png";
  divCreate.append(imgElement);
  const titleCreation = document.createElement("h4");
  titleCreation.textContent = showTitle;
  divCreate.append(titleCreation);
  const bodyCreation = document.createElement("p");
  bodyCreation.textContent = showText;
  divCreate.append(bodyCreation);
};

const getPost = async function () {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await response.json();

    for (let i = 0; i < posts.length; i++) {
      const newPost = posts[i];

      displayPost(newPost.title, newPost.body);
    }
  } catch (err) {
    console.log(err);
  }
};

getPost();
