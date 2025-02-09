// Firebase SDK Imports (Correct way)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js";

// Firebase Configuration (Replace with your details)
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
const db = getFirestore(app);

// Function to Fetch and Display Blog Posts
async function fetchBlogs() {
    const postsContainer = document.getElementById("posts");
    postsContainer.innerHTML = ""; // Clear previous content

    try {
        const querySnapshot = await getDocs(collection(db, "blogPosts"));

        if (querySnapshot.empty) {
            postsContainer.innerHTML = "<p>No blog posts available.</p>";
            return;
        }

        querySnapshot.forEach((doc) => {
            const blogData = doc.data();

            // Create Blog Post Card
            const blogPost = document.createElement("div");
            blogPost.classList.add("post");

            let shortContent = blogData.content.split(" ").slice(0, 60).join(" ") + "..."
            .replace(/\[([^\]]+)\]\((https?:\/\/[^\s]+)\)/g, '<a href="$2" target="_blank" style="color:red; font-size:0.9rem; display:block;">$1</a>') 
            .replace(/^## (.*)$/gm, '<h3 style="color: white; margin-top:1rem;">$1</h3>') 
            .replace(/^### (.*)$/gm, '<h4 style="color: white; margin-top:1rem;">$1</h4>') 
            .replace(/\n/g, '<br>'); 
            
            let fullContent = blogData.content
                .replace(/\[([^\]]+)\]\((https?:\/\/[^\s]+)\)/g, '<a href="$2" target="_blank" style="color:red; font-size:0.9rem; display:block;">$1</a>') 
                .replace(/^## (.*)$/gm, '<h3 style="color: white; margin-top:1rem;">$1</h3>') 
                .replace(/^### (.*)$/gm, '<h4 style="color: white; margin-top:1rem;">$1</h4>') 
                .replace(/\n/g, '<br>'); 

            blogPost.innerHTML = `
                <h3 style="color: white;">${blogData.title}</h3>
                <p style="color: white;"><b>Author:</b> ${blogData.author}  |  <b>Date:</b> ${blogData.date}</p>
                ${blogData.image ? `<img src="${blogData.image}" alt="Blog Image" style="width:100%" class="blog-image">` : ""}
                ${blogData.video ? `<a href="${blogData.video}" target="_blank" style="color:yellow " class="video-link">Watch Video</a>` : ""}
                <div class="blog-content" style="color: white; margin-top: 1rem; max-height: 100px; overflow: hidden;">
                    ${shortContent}
                </div>
                <br>
                <button class="read-more">Read More</button>
            `;

            postsContainer.appendChild(blogPost);

            const readMoreBtn = blogPost.querySelector(".read-more");
            const blogContent = blogPost.querySelector(".blog-content");

            readMoreBtn.addEventListener("click", function () {
                if (readMoreBtn.innerText === "Read More") {
                    blogContent.style.maxHeight = "none";
                    blogContent.innerHTML = fullContent;
                    readMoreBtn.innerText = "Read Less";
                } else {
                    blogContent.style.maxHeight = "100px"; // Restrict height to maintain consistency
                    blogContent.innerHTML = shortContent;
                    readMoreBtn.innerText = "Read More";
                }
            });
        });

    } catch (error) {
        console.error("Error fetching blogs:", error);
        postsContainer.innerHTML = "<p>Error loading blog posts.</p>";
    }
}

fetchBlogs();
