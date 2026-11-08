const cvStatus = document.querySelector("#cv-status");
const workList = document.querySelector("#work-list");
const educationList = document.querySelector("#education-list");

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

function showEntries(list, entries) {
  for (const entry of entries) {
    let endDate = "Present";
    if (entry.end) {
      endDate = `<time datetime="${entry.end}">${formatDate(entry.end)}</time>`;
    }

    const item = document.createElement("li");
    item.className = "timeline-item";
    item.innerHTML = `
      <h3>${entry.title}</h3>
      <p class="badge">${entry.type}</p>
      <ul class="timeline-info">
        <li><img src="img/icons/building.svg" alt="" width="16" height="16">${entry.place}</li>
        <li><img src="img/icons/location.svg" alt="" width="16" height="16">${entry.city}</li>
      </ul>
      <p class="timeline-date">
        <time datetime="${entry.start}">${formatDate(entry.start)}</time> - ${endDate}
      </p>
    `;
    list.append(item);
  }
}

async function loadCv() {
  try {
    const response = await fetch("data/cv.json");
    if (!response.ok) {
      throw new Error("Could not load cv.json");
    }
    const cv = await response.json();

    showEntries(workList, cv.work);
    showEntries(educationList, cv.education);
    cvStatus.hidden = true;
  } catch (error) {
    cvStatus.textContent = "The CV could not be loaded. Please try again later.";
    cvStatus.classList.add("error");
    cvStatus.hidden = false;
  }
}

loadCv();
