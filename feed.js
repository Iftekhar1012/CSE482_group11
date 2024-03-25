document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var postContent = document.getElementById('postContent').value;
    if (postContent.trim() === '') {
        alert('Please enter some content before posting.');
        return;
    }
    var post = document.createElement('div');
    post.className = 'post';
    post.innerHTML = `
        <h2>New Post</h2>
        <p>${postContent}</p>
        <p>Posted by You</p>
    `;
    document.getElementById('posts').appendChild(post);
    document.getElementById('postContent').value = ''; // Clear the textarea
});