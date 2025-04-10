const DISCORD_USER_ID = "934530409293824020";
const API_KEY = "0fd2220c3aad77cfc2424c236dec9bdc";

const statusColors = {
  online: "#43b581",
  dnd: "#f04747",
  idle: "#faa61a",
  offline: "#747f8d"
};

async function getDiscordStatus() {
  try {
    const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`, {
      headers: {
        "Authorization": `Bearer ${API_KEY}`
      }
    });

    const data = await response.json();

    createDiscordStatusElement(data);
  } catch (error) {
    console.error("Error fetching the status:", error);
  }
}

function createDiscordStatusElement(data) {
  const d = data.data;
  const container = document.getElementById("discord-status");
  container.innerHTML = "";

  const avatar = document.createElement("img");
  avatar.className = "avatar";
  avatar.src = `https://cdn.discordapp.com/avatars/${d.discord_user.id}/${d.discord_user.avatar}.png?size=64`;

  const info = document.createElement("div");
  info.className = "info";

  const username = document.createElement("div");
  const statusDot = document.createElement("span");
  statusDot.className = "status-indicator";
  statusDot.style.backgroundColor = statusColors[d.discord_status] || "#747f8d";

  const nameText = document.createTextNode(`${d.discord_user.username}`);
  username.appendChild(statusDot);
  username.appendChild(nameText);

  const activities = [];
  if (d.listening_to_spotify) {
    activities.push(`🎵 Listening to ${d.spotify.song} by ${d.spotify.artist}`);
  }

  const game = d.activities.find(act => act.type === 0 || act.type === 2 || act.type === 4);
  if (game) {
    activities.push(`🎮 Playing ${game.name}`);
  }

  if (activities.length === 0) {
    activities.push("Idle");
  }

  const activityDiv = document.createElement("div");
  activityDiv.innerHTML = activities.join(" | ");

  info.appendChild(username);
  info.appendChild(activityDiv);
  container.appendChild(avatar);
  container.appendChild(info);
}

getDiscordStatus();