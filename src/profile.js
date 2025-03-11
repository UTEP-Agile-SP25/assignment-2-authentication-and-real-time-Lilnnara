import { onUserChange } from "./auth"; 
import { db } from "./config";
import { collection, addDoc, deleteDoc, onSnapshot, doc } from "firebase/firestore";

document.addEventListener("DOMContentLoaded", () => {
  // ---------------------
  // Bio Section
  // ---------------------
  const bioInput = document.getElementById("bio");
  const bioDisplay = document.getElementById("bio-display");
  const profileForm = document.getElementById("profile-form");

  function updateBio() {
    const bioText = bioInput.value.trim();
    if (bioText) {
      bioDisplay.innerHTML = `<p><strong>Bio:</strong> ${bioText}</p>`;
      bioInput.value = ""; 
    }
  }

  profileForm.addEventListener("submit", (event) => {
    event.preventDefault();
    updateBio();
  });

  // ---------------------
  // Books Section
  // ---------------------
  const bookForm = document.getElementById("book-form");
  const bookNameInput = document.getElementById("book-name");
  const bookTableBody = document.getElementById("book-list");

  let currentUserId = null; 

  // Function to add a book to Firestore
  async function addBook(bookName, userId) {
    if (!userId) return;
    try {
      await addDoc(collection(db, "users", userId, "books"), {
        name: bookName,
        timestamp: new Date()
      });
    } catch (error) {
      console.error("Error adding book:", error);
    }
  }

// Function to delete a book from Firestore
async function deleteBook(bookId, userId) {
    if (!userId) return;
    try {
      await deleteDoc(doc(db, "users", userId, "books", bookId));
      console.log(`Book with id ${bookId} has been deleted from Firebase`);
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  }
  

  // Real-time listener for books collection
  function listenForBooks(userId) {
    const booksRef = collection(db, "users", userId, "books");
    onSnapshot(booksRef, (snapshot) => {

        bookTableBody.innerHTML = "";
      snapshot.forEach((docSnapshot) => {
        const bookData = docSnapshot.data();
        const row = document.createElement("tr");

        // Create cells for book name and action
        const nameCell = document.createElement("td");
        nameCell.textContent = bookData.name;

        const actionCell = document.createElement("td");
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.setAttribute("data-id", docSnapshot.id);
        deleteBtn.addEventListener("click", () => {
          deleteBook(docSnapshot.id, userId);
        });
        actionCell.appendChild(deleteBtn);

        row.appendChild(nameCell);
        row.appendChild(actionCell);

        bookTableBody.appendChild(row);
      });
    });
  }

  // Event listener for adding a book
  bookForm.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("Book form submitted");
    const bookName = bookNameInput.value.trim();
    if (bookName && currentUserId) {
      console.log("Adding book:", bookName, "for user:", currentUserId);
      addBook(bookName, currentUserId);
      bookNameInput.value = ""; 
    } else {
      console.log("Either bookName is empty or user is not logged in");
    }
  });


  onUserChange((user) => {
    if (user) {
      currentUserId = user.uid;
      document.getElementById("greeting").innerHTML = `<h1>Hello, ${user.displayName || "User"}!</h1>`;
      listenForBooks(user.uid);
    } else {
      currentUserId = null;
      document.getElementById("greeting").innerHTML = "<h1>Please log in.</h1>";
    }
  });
});
