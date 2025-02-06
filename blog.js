async function fetchPosts() {
    try {
        const response = await fetch("posts.json"); // Local file
        if (!response.ok) {
            throw new Error("Failed to fetch posts.");
        }
        const posts = await response.json();

        const postsContainer = document.getElementById("posts");
        postsContainer.innerHTML = ""; // Clear loading text

        posts.forEach(post => {
            const postElement = document.createElement("div");
            postElement.classList.add("post");
        
            // Start building the HTML content for each post
            let postContent = `
                <h2>${post.title}</h2>
                <small>${post.date} | By ${post.author}</small>
            `;
        
            // If there's an image for the post, display it
            if (post.image) {
                postContent += `
                    <img src="${post.image}" alt="${post.title}" style="width:100%; margin-top: 10px; border-radius: 8px;">
                `;
            }
        
            postContent += `
                <p class="preview">${post.content.substring(0, 150)}...</p>
                <p class="full-content" style="display: none;">${post.content}</p>
            `;
        
         
            // If there's a link to an external article, add it
            if (post.link) {
                postContent += `
                    <a href="${post.link}" target="_blank" class="read-more-link" style="  font-size: 1.5rem;
    color:red; text-decoration:none;">Source</a>
                `;
            }
        
            // If tags exist, render them
            if (post.tags && post.tags.length > 0) {
                postContent += `
                    <div class="tags">
                        <strong>Tags:</strong> ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join(", ")}
                    </div>
                `;
            }
        
            postContent += `
                <button class="read-more" onclick="toggleContent(this)">Read More</button>
                <hr>
            `;
        
            postElement.innerHTML = postContent;
            postsContainer.appendChild(postElement);
        });
        
    } catch (error) {
        console.error("Error fetching posts:", error);
        document.getElementById("posts").innerHTML = "<p>Error loading posts. Try again later.</p>";
    }
}

// Function to toggle between 'Read More' and 'Read Less'
function toggleContent(button) {
    const post = button.closest(".post");
    const preview = post.querySelector(".preview");
    const fullContent = post.querySelector(".full-content");
    const readMoreButton = post.querySelector(".read-more");

    if (fullContent.style.display === "none") {
        // Expand the content
        fullContent.style.display = "block";
        preview.style.display = "none";
        readMoreButton.textContent = "Read Less";
    } else {
        // Collapse the content
        fullContent.style.display = "none";
        preview.style.display = "block";
        readMoreButton.textContent = "Read More";
    }
}

// Fetch posts when the page loads
document.addEventListener("DOMContentLoaded", fetchPosts);
