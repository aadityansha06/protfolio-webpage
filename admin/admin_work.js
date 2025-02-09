// Import necessary Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCwxnphK6dI8yGHbF7NGgIDZHdy_04O_5M",
    authDomain: "admin-cf33c.firebaseapp.com",
    projectId: "admin-cf33c",
    storageBucket: "admin-cf33c.firebasestorage.app",
    messagingSenderId: "684652395514",
    appId: "1:684652395514:web:782a62390a2f5577da8243"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const postsCollection = collection(db, "blogPosts"); // Reference to Firestore collection

// Login function
function loginuser(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;
    
    signInWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
            console.log("User ID:", userCredential.user.uid);
            window.location.href = "dashboard.html"; // Redirect to dashboard after successful login
        })
        .catch((error) => {
            console.error("Error logging in: ", error.message);
            alert("Login failed! Please check your credentials.");
        });
}

// Add event listener for login
const login_btn = document.querySelector('.btn-login');
if (login_btn) {
    login_btn.addEventListener('click', loginuser);
}

// Logout function for anchor tag <a>
const logoutBtn = document.querySelector('#logout');
if (logoutBtn) {
    logoutBtn.addEventListener('click', (event) => {
        event.preventDefault();
        signOut(auth)
            .then(() => {
                alert('You have logged out successfully.');
                window.location.href = 'admin.html'; // Redirect to login page
            })
            .catch((error) => {
                console.error("Error during sign out:", error);
                alert("Error logging out. Please try again.");
            });
    });
}

// Add post function
document.getElementById("blog-form").addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent form refresh

    // Get values from form fields
    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const content = document.getElementById("content").value.trim();
    const date = document.getElementById("date").value.trim();
    const image = document.getElementById("image").value.trim();
    const video = document.getElementById("video").value.trim();

    // Validate required fields
    if (!title || !author || !content || !date) {
        alert("Please fill in all required fields (Title, Author, Content, Date).");
        return;
    }

    try {
        await addDoc(postsCollection, {
            title,
            author,
            content,
            date,
            image: image || "",
            video: video || "",
        });

        alert("Post added successfully!");
        fetchPosts(); // Refresh post list
        document.getElementById("blog-form").reset(); // Clear form fields
    } catch (error) {
        console.error("Error adding post:", error);
        alert("Failed to add post! Error: " + error.message);
    }
});

// Fetch and display posts
async function fetchPosts() {
    const postsContainer = document.getElementById("posts-container");
    postsContainer.innerHTML = ""; // Clear previous posts

    const querySnapshot = await getDocs(postsCollection);
    querySnapshot.forEach((doc) => {
        const post = doc.data();
        const postId = doc.id;

        // Ensure fields are properly assigned
        const title = post.title || "No Title";
        const author = post.author || "Unknown Author";
        const image = post.image ? `<img src="${post.image}" width="100%">` : "";
        const content = post.content || "No content available.";
        const date = post.date || "No Date";
        const video = post.video ? `<a href="${post.video}" target="_blank" style="color: yellow;">Watch Video</a>` : "";

        // Create post container with delete button
        const postElement = document.createElement("div");
        postElement.classList.add("post-item");

        postElement.innerHTML = `
            <h3 style="color: white;">${title}</h3>
            <p style="color: white;"><b>Author:</b> ${author}  |  <b>Date:</b> ${date}</p>
            ${image}
            ${video}
            <div style="color: white; margin-top: 1rem;">
                ${content
                    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s]+)\)/g, '<a href="$2" target="_blank" style="color:red; font-size:0.9rem; display:block;">$1</a>') // Convert links
                    .replace(/^## (.*)$/gm, '<h3 style="color: white; margin-top:1rem;">$1</h3>') // Convert ## to <h3>
                    .replace(/^### (.*)$/gm, '<h4 style="color: white; margin-top:1rem;">$1</h4>') // Convert ### to <h4>
                    .replace(/\n/g, '<br>') // Handle new lines
                }
            </div>
            <br>
            <button class="btn-delete" data-id="${postId}">🗑 Delete Post</button>
        `;

        postsContainer.appendChild(postElement);
    });

    // Attach event listeners to all delete buttons
    document.querySelectorAll(".btn-delete").forEach(button => {
        button.addEventListener("click", () => {
            const postId = button.getAttribute("data-id");
            deletePost(postId);
        });
    });
}

// Call fetchPosts when the admin panel loads
fetchPosts();

// Delete post function
async function deletePost(postId) {
    if (confirm("Are you sure you want to delete this post?")) {
        try {
            await deleteDoc(doc(db, "blogPosts", postId));
            alert("Post deleted successfully!");
            fetchPosts(); // Refresh post list
        } catch (error) {
            console.error("Error deleting post:", error);
            alert("Failed to delete post!");
        }
    }
}
