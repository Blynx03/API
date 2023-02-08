
let choice = "";
let data = [];
// const [
//   { playerId, first_name, last_name, position, 
//     team { conference, full_name, teamId, name }
// }
// const options = {
//     method: 'GET',
//     url:  + choice,
//     };
  
const table = document.querySelector(".main-container");

const teams = [];
const playersFirstName = [];
const playersLastName = [];
const playersPosition = [];
const conference = [];
const division = [];
const teamName = [];
let avoidRepeat = "";
let j = 0;
const chosenSet = {
        teamFull: "",
        teamAlias: "",
        teamConference: "",
        teamDivision: ""
}

//connect to api

async function connectAPI() {
  try {
    const res = await fetch('https://www.balldontlie.io/api/v1/players');
    data = await res.json();
    console.log(data)
  } catch(err) {
    console.error(err);
  }
    for (let i = 0; i < data.data.length; i++) {
      teams.push(data.data[i].team.full_name);
      playersFirstName.push(data.data[i].first_name);
      playersLastName.push(data.data[i].last_name);
      playersPosition.push(data.data[i].position);
      conference.push(data.data[i].team.conference);
      division.push(data.data[i].team.division);
      teamName.push(data.data[i].team.full_name);
    }
    console.log(teams)
}

// add event listener to dropdown menu
function listenTo() {
  const categories = document.querySelectorAll(".dropdown-item");
  categories.forEach(category => {
    category.addEventListener('click', (e) => {
      choice = e.target.dataset.category;
      chosenCategory();
  });
});
}

// links to onclick
function chosenCategory() {
    if (choice === avoidRepeat) {
      return;
    }
    switch(choice) {
      case "teams": showTeams();
                  break;
      case "players": showPlayers();
                  break;
      case "standings": showStandings();
                  break;
      case "statistics": showStatistics();
                  break;
      default: window.location = "index.html"
    }
    avoidRepeat = choice;
}

// teams category
function showTeams() {
  table.classList.add('category-container', 'justify-content-center', 'bg-dark', 'bg-opacity-50', 'rounded-5');
  table.innerHTML = "<h2 class='sub-title'>NBA Team Information</h2>";
  
  const teamAndDescContainer = document.createElement('div');
  table.appendChild(teamAndDescContainer);
  teamAndDescContainer.className = "teams-desc-container px-4 py-4 mx-auto bg-light bg-opacity-25 rounded-5";
  
  const newDiv1 = document.createElement('div');
  const newDiv2 = document.createElement('div');
  const teamContainer = teamAndDescContainer.appendChild(newDiv1);
  teamContainer.className = 'left-container'

  const newDiv3 = document.createElement('div');
  const newDiv4 = document.createElement('div');
  const categoryTitle = teamContainer.appendChild(newDiv3);
  categoryTitle.className = "category-title bg-transparent fs-4 ";
  categoryTitle.textContent = "Teams";
  const listTeam = teamContainer.appendChild(newDiv4);
  listTeam.className = "list-team bg-transparent fs-6 ";

  const descContainer = teamAndDescContainer.appendChild(newDiv2);
  // descContainer.className = 'right-container bg-warning bg-opacity-25 rounded-4';
  

  const arrTeam = [];
  const akaTeam = [];
  // const descDiv = document.createElement('div');
  // descContainer.appendChild(descDiv);
  
  // Team description on hover
  let t1 = document.createElement('div');
  let t2 = document.createElement('div');
  let t3 = document.createElement('div');
  let t4 = document.createElement('div');
  const tDiv1 = descContainer.appendChild(t1);
  const tDiv2 = descContainer.appendChild(t2);
  const tDiv3 = descContainer.appendChild(t3);
  const tDiv4 = descContainer.appendChild(t4);
  tDiv1.className = "desc-nba-logo t-div1 desc-item"
  tDiv2.className = "desc-team-logo t-div2 desc-item"
  tDiv3.className = "desc-conference t-div3 desc-item"
  tDiv4.className = "desc-division t-div4 desc-item"
  // tDiv1.classList.add('grid-area', 'nba-logo');
  // tDiv2.classList.add('grid-area', 'team-logo');
  // tDiv3.classList.add('grid-area', 'conference');
  // tDiv4.classList.add('grid-area', 'division');

    // conference and division containers
    const oneDiv = document.createElement('div');
    const twoDiv = document.createElement('div');
    const confContainer = tDiv3.appendChild(oneDiv);
    const divisionContainer = tDiv4.appendChild(twoDiv);
    confContainer.className = "conference fs-3 px-3 pt-1 pb-3 mt-3 border border-3 border-dark shadow rounded-3";
    divisionContainer.className = "division fs-3 px-3 pt-1 pb-3 border border-3 border-dark shadow rounded-3";
    confContainer.textContent = "Conference:";
    divisionContainer.textContent = "Division:";
    
    const child1Div = document.createElement('div');
    const child2Div = document.createElement('div');
    const conferenceValue = confContainer.appendChild(child1Div);
    const divisionValue = divisionContainer.appendChild(child2Div);
    conferenceValue.className = "conf-value fs-4 text-light d-flex justify-content-center";
    divisionValue.className = "division-value fs-4 text-light d-flex justify-content-center";


  // removing duplicates
  const newTeams = teams.reduce((accumulator, currentValue) => {
    if (!accumulator.includes(currentValue)) {
      return [...accumulator, currentValue]
      
    }
    return accumulator;
  }, []);

  function handleMouseOver(e, key) {
    let team = teams[key];
    let arrTeamName = team.split(" ");
    let lastString = arrTeamName[arrTeamName.length - 1].toLowerCase();
    let conf = conference[key];
    let divi = division[key];
    if (lastString === '76ers') {
      lastString = "p76ers";
    }
    descContainer.className = "desc-container col-7 bg-dark bg-opacity-25 rounded-5 border border-2 border-warning";
    descContainer.style.animation = "appear 1s ease",
                                    "enlarge 2s ease";
    tDiv1.innerHTML = `<img src='images/nba-logo2.png' class='logo-nba desc-nba-logo' />`
    tDiv2.innerHTML = `<img src='images/team/${lastString}.png' class='logo-team info-team-logo' />`
    // tDiv2.style.backgroundImage = "url(images/team/" + team + ".png";

    conferenceValue.textContent = conf;
    divisionValue.textContent = divi;
  }


  // showing list of teams on left side with corresponding logo
  for (let j = 0; j < newTeams.length; j++) {
    const createDiv = document.createElement('div');
    const newDiv = listTeam.appendChild(createDiv);  
    
    let arrTeamName = newTeams[j].split(" ");
    let lastString = arrTeamName[arrTeamName.length - 1].toLowerCase();

    if (lastString === "76ers") {
      lastString = "p76ers";
    }
    let newSpanLogo = document.createElement('span');
    let spanLogo = listTeam.appendChild(newSpanLogo);

    newDiv.innerHTML = newTeams[j];
    spanLogo.innerHTML = `<img class="team-logo p2" src="images/team/${lastString}.png">`;

    newDiv.style.animation = "enlarge 4s ease forwards";
    newDiv.className = "team-content text-light bg-opacity-75 px-3 py-1 fs-6 ";

    newDiv.setAttribute("id", lastString);
    let addListen = document.getElementById(lastString);
    newDiv.setAttribute('data-alias', lastString);
    // newDiv.setAttribute('data-value', teams[j]);  // DOUBLE CHECK THE NEXT THREE LINES IF VALUES NEED TO BE CHANGED OR NEEDED
    // newDiv.setAttribute('data-conference', conference[j]);
    // newDiv.setAttribute('data-division', division[j]);

    // addListen.addEventListener('mouseout', () => {
    //   descDiv.style.animation = "disappear 1s ease forwards";
    // });


  }




  // adding event listeners to teams
    const addListenToTeams = document.querySelectorAll('.team-content');
    addListenToTeams.forEach(team => {
      team.addEventListener('mouseover', (e) => {
        let chosenTeam = e.target.innerText;
        let teamIndex = teams.indexOf(chosenTeam);
        handleMouseOver(e, teamIndex);
      });
    });
    let rContainer = document.querySelector('.desc-container');
    rContainer.addEventListener('mouseout', () => {
      rContainer.style.animation = 'disappear 1s ease forwards';
    });
}

// players category
function showPlayers() {
  table.innerHTML = "<h2>Players</h2>";
  table.classList.add('d-block', 'mx-auto', 'p-2', 'shadow-lg');

  const container2 = document.createElement('table');
  const innerContainer = table.appendChild(container2);
  innerContainer.classList.add('p-2', 'bg-danger-subtle','border', 'border-dark', 'shadow-white', 'rounded-5', 'text-dark', 'text-center', 'd-flex', 'col-auto');

  const createDiv1 = document.createElement('th');
  const playerDiv = innerContainer.appendChild(createDiv1);
  playerDiv.classList.add('col','table-success', 'p-2', 'bg-secondary', 'rounded-start-5', 'fw-bolder');
  playerDiv.innerHTML = "<h5>Name</h5>";

  const createDiv2 = document.createElement('th');
  const teamDiv = innerContainer.appendChild(createDiv2);
  teamDiv.classList.add('col', 'p-2', 'bg-secondary', 'fw-bolder');
  teamDiv.innerHTML = "<h5>Team</h5>";

  const createDiv3 = document.createElement('th');
  const positionDiv = innerContainer.appendChild(createDiv3);
  positionDiv.classList.add('col', 'p-2', 'bg-secondary', 'rounded-end-5', 'fw-bolder');
  positionDiv.innerHTML = "<h5>Position</h5>";

  

  for (let i = 0; i < playersFirstName.length-1; i++) {
    const div1 = document.createElement('div');
    // div1.style.fontWeight = "normal";
    const firstName = playerDiv.appendChild(div1);
    firstName.textContent = playersFirstName[i] + " " + playersLastName[i];
    firstName.className += ' fw-normal rounded-start-3';
    // for the player's pictures
    // firstName.className = "img" + last_name;

    const div2 = document.createElement('div');
    const teamDiv2 = teamDiv.appendChild(div2);
    teamDiv2.textContent = teamName[i];
    teamDiv2.className += ' fw-normal';

    const div3 = document.createElement('div');
    const posDiv = positionDiv.appendChild(div3);
    posDiv.textContent = playersPosition[i];
    posDiv.className += ' fw-normal rounded-end-3';
  }
  
}


connectAPI();
listenTo();