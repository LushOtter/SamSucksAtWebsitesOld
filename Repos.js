const username = "lushotter";
const repoList = document.getElementById("repo-list");

fetch(`https://api.github.com/users/${username}/repos`)
  .then(response => response.json())
  .then(repos => {
    repos.forEach(repo => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>: ${repo.description || "No description"}`;
      repoList.appendChild(li);
    });
  })
  .catch(error => {
    console.error("Error fetching repositories:", error);
    repoList.innerHTML = "<li>Failed to load repositories.</li>";
  });