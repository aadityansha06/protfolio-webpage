document.addEventListener("DOMContentLoaded", () => {
    document.body.style.opacity = "0";
    document.body.style.transform = "translateY(20px)";
    setTimeout(() => {
        document.body.style.transition = "opacity 1s ease-out, transform 2s ease-out";
        document.body.style.opacity = "1";
        document.body.style.transform = "translateY(0)";
    }, 100);

    fetchPosts();
    window.addEventListener("scroll", revealPosts);
});

async function fetchPosts() {
    try {
        const response = await fetch("posts.json");
        if (!response.ok) {
            throw new Error("Failed to fetch posts.");
        }
        const posts = await response.json();

        const postsContainer = document.getElementById("posts");
        postsContainer.innerHTML = ""; 

        posts.forEach((post) => {
            const postElement = document.createElement("div");
            postElement.classList.add("post");
            postElement.style.opacity = "0";
            postElement.style.transform = "translateY(30px)";
            postElement.style.transition = "opacity 2s ease-out, transform 2s ease-out";

            let postContent = `
                <h2>${post.title}</h2>
                <small>${post.date} | By ${post.author}</small>
            `;

            if (post.image) {
                postContent += `
                    <img src="${post.image}" alt="${post.title}" style="width:100%; margin-top: 10px; border-radius: 8px;">
                `;
            }

            postContent += `
                <p class="preview">${post.content.substring(0, 150)}...</p>
                <p class="full-content" style="display: none;">${post.content}</p>
            `;

            if (post.link) {
                postContent += `
                    <a href="${post.link}" target="_blank" class="read-more-link" style="font-size: 1.5rem; color:red; text-decoration:none;">Source</a>
                `;
            }

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

        revealPosts();
    } catch (error) {
        console.error("Error fetching posts:", error);
        document.getElementById("posts").innerHTML = "<p>Error loading posts. Try again later.</p>";
    }
}

function revealPosts() {
    const posts = document.querySelectorAll(".post");
    const windowHeight = window.innerHeight;
    posts.forEach(post => {
        const postTop = post.getBoundingClientRect().top;
        if (postTop < windowHeight - 50) {
            post.style.opacity = "1";
            post.style.transform = "translateY(0)";
        }
    });
}

function toggleContent(button) {
    const post = button.closest(".post");
    const preview = post.querySelector(".preview");
    const fullContent = post.querySelector(".full-content");
    const readMoreButton = post.querySelector(".read-more");

    if (fullContent.style.display === "none") {
        fullContent.style.display = "block";
        preview.style.display = "none";
        readMoreButton.textContent = "Read Less";
    } else {
        fullContent.style.display = "none";
        preview.style.display = "block";
        readMoreButton.textContent = "Read More";
    }
}
