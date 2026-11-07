const githubUser = "teddyyGO";
const projectStatus = document.querySelector("#project-status");
const projectList = document.querySelector("#project-list");

let allProjects = [];

function createProjectCard(repo) {
  const item = document.createElement("li");
  const card = document.createElement("article");
  card.className = "project-card";

  const content = document.createElement("div");
  content.className = "project-content";

  const title = document.createElement("h2");
  title.textContent = repo.name;

  const text = document.createElement("p");
  text.className = "project-text";
  text.textContent = repo.description || "No description yet.";

  const tech = document.createElement("p");
  tech.className = "project-tech";
  tech.textContent = "Language: " + (repo.language || "Other");

  const links = document.createElement("div");
  links.className = "project-links";

  const link = document.createElement("a");
  link.href = repo.html_url;
  link.textContent = "View Code";
  const hiddenText = document.createElement("span");
  hiddenText.className = "visually-hidden";
  hiddenText.textContent = " of " + repo.name;
  link.append(hiddenText);

  links.append(link);
  content.append(title, text, tech, links);
  card.append(content);
  item.append(card);
  return item;
}

function showProjects(projects) {
  projectList.innerHTML = "";

  if (projects.length === 0) {
    projectStatus.textContent = "There are no projects to show yet.";
    projectStatus.hidden = false;
    return;
  }

  projectStatus.hidden = true;
  for (const repo of projects) {
    projectList.append(createProjectCard(repo));
  }
}

async function loadProjects() {
  try {
    const response = await fetch(`https://api.github.com/users/${githubUser}/repos?sort=updated&per_page=100`, {
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) {
      throw new Error("GitHub answered with status " + response.status);
    }
    const repos = await response.json();

    allProjects = repos.filter((repo) => !repo.fork && repo.name !== githubUser);
    showProjects(allProjects);
  } catch (error) {
    projectStatus.innerHTML = `Could not load projects from GitHub right now. Try again later or visit <a href="https://github.com/${githubUser}">my GitHub profile</a>.`;
    projectStatus.classList.add("error");
  }
}

loadProjects();
