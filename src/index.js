import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
  getDoc,
  updateDoc,
} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBNE8LwUIXZ_Rp-cEqKF_99WyfIoHDiT2M",
  authDomain: "library-38d57.firebaseapp.com",
  projectId: "library-38d57",
  storageBucket: "library-38d57.appspot.com",
  messagingSenderId: "146478611643",
  appId: "1:146478611643:web:5921e07d7ed38a8eb5bd9e",
};
// initialize firebase app
initializeApp(firebaseConfig);

// init services
const db = getFirestore();

// collection ref

const colRef = collection(db, "books");

// queries

const q = query(colRef, orderBy("createdAt"));

// realtime collection data

onSnapshot(q, (snapshot) => {
  let books = [];
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id });
  });
  // display books
  const remover = document.getElementById("bookDisplay");
  remover.remove();
  const newTable = document.createElement("div");
  newTable.id = "bookDisplay";
  document.getElementById("catcher").appendChild(newTable);
  for (let i = 0; i < books.length; i++) {
    const item = document.createElement("div");
    item.id = "cells" + i;
    item.className = "cells";
    document.getElementById("bookDisplay").appendChild(item);
    const itemParahraph1 = document.createElement("p");
    const itemParahraph2 = document.createElement("p");
    const itemParahraph4 = document.createElement("p");
    const itemParahraph5 = document.createElement("p");
    const itemParahraph3 = document.createElement("button");
    document.getElementById("cells" + i).appendChild(itemParahraph1);
    document.getElementById("cells" + i).appendChild(itemParahraph2);
    document.getElementById("cells" + i).appendChild(itemParahraph4);
    document.getElementById("cells" + i).appendChild(itemParahraph5);
    document.getElementById("cells" + i).appendChild(itemParahraph3);
    itemParahraph1.innerHTML = "Title: " + books[i].title;
    itemParahraph2.innerHTML = "Author: " + books[i].author;
    itemParahraph4.innerHTML = "Pages: " + books[i].pages;
    itemParahraph5.innerHTML = "Read Status: " + books[i].read;
    itemParahraph3.id = books[i].id;
    itemParahraph3.innerHTML = "delete";
    itemParahraph3.classList = "deleteButton" + i;
    document
      .querySelector(".deleteButton" + i)
      .addEventListener("click", (event) => {
        console.log(event.target.id);

        const docRef = doc(db, "books", event.target.id);

        deleteDoc(docRef).then(() => {
          console.log("deleted");
        });
      });
  }
});

//add documents
const addBookForm = document.querySelector(".add");
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    pages: addBookForm.pages.value,
    read: addBookForm.read.checked,
    createdAt: serverTimestamp(),
  }).then(() => {
    addBookForm.reset();
  });
});
//delete docs
const deleteBookForm = document.querySelector(".delete");
deleteBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const docRef = doc(db, "books", deleteBookForm.id.value);

  deleteDoc(docRef).then(() => {
    deleteBookForm.reset();
  });
});

// get a single doc
const docRef = doc(db, "books", "y8BYLUqCpKvk3WIaaabW");

onSnapshot(docRef, (doc) => {
  console.log(doc.data(), doc.id);
});

// updating a document

const updateForm = document.querySelector(".update");
updateForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const docRef = doc(db, "books", updateForm.id.value);

  updateDoc(docRef, {
    title: "updated title",
  }).then(() => {
    updateForm.reset();
  });
});

//
// let myLibrary = [];

// class Book {
//   constructor(title, author, numberOfPages, readStatus) {
//     this.title = title;
//     this.author = author;
//     this.numberOfPages = numberOfPages;
//     this.readStatus = readStatus;
//   }
// }

// function addBookToLibrary() {
//   title = document.getElementById("titleId").value;
//   author = document.getElementById("authorId").value;
//   numberOfPages = document.getElementById("pagesId").value;
//   if (document.getElementById("readingId").checked) {
//     readStatus = "Yes";
//   } else {
//     readStatus = "No";
//   }

//   myLibrary.push(new Book(title, author, numberOfPages, readStatus));
//   displayBooks();
// }

// function displayBooks() {
//   var remover = document.getElementById("bookDisplay");
//   remover.remove();
//   newTable = document.createElement("div");
//   newTable.id = "bookDisplay";
//   document.getElementById("catcher").appendChild(newTable);
//   for (let i = 0; i < myLibrary.length; i++) {
//     item = document.createElement("div");
//     item.id = "cells" + i;
//     item.className = "cells";
//     document.getElementById("bookDisplay").appendChild(item);
//     itemParahraph1 = document.createElement("p");
//     itemParahraph2 = document.createElement("p");
//     itemParahraph3 = document.createElement("p");
//     itemParahraph4 = document.createElement("p");
//     removeButton = document.createElement("button");
//     removeButton.id = [i];
//     checkedButton = document.createElement("input");
//     checkedButton.type = "checkbox";
//     checkedButton.id = "button" + i;
//     checkedButton.checked = myLibrary[i].readStatus;
//     document.getElementById("cells" + i).appendChild(removeButton);
//     document.getElementById("cells" + i).appendChild(itemParahraph1);
//     document.getElementById("cells" + i).appendChild(itemParahraph2);
//     document.getElementById("cells" + i).appendChild(itemParahraph3);
//     document.getElementById("cells" + i).appendChild(itemParahraph4);
//     document.getElementById("cells" + i).appendChild(checkedButton);

//     itemParahraph1.innerHTML = "Title: " + myLibrary[i].title;
//     itemParahraph2.innerHTML = "Author: " + myLibrary[i].author;
//     itemParahraph3.innerHTML = "Number Of Pages: " + myLibrary[i].numberOfPages;
//     itemParahraph4.innerHTML = "Have i read it? " + myLibrary[i].readStatus;
//     removeButton.innerHTML = "remove";
//     document.getElementById(i).addEventListener("click", function () {
//       myLibrary.splice(i, 1);
//       displayBooks();
//     });
//     document
//       .getElementById("button" + i)
//       .addEventListener("click", function () {
//         if (myLibrary[i].readStatus === "Yes") {
//           myLibrary[i].readStatus = "No";
//           displayBooks();
//         } else {
//           myLibrary[i].readStatus = "Yes";
//           displayBooks();
//         }
//       });
//   }
// }
// window.addBookToLibrary = addBookToLibrary;
