
let choice = "";
let data = [];
  
const table = document.querySelector('.main-container');

const teams = [];
const playersFirstName = [];
const playersLastName = [];
const playersFullName = [];
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
      playersFullName.push(`${playersFirstName[i]} ${playersLastName[i]}`);
    }
    console.log(teams)
}

// add event listener to dropdown menu
function listenTo() {
  const categories = document.querySelectorAll('.dropdown-item');
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
      case 'teams': showTeams();
                  break;
      case 'players': showPlayers();
                  break;
      case 'standings': showStandings();
                  break;
      case 'statistics': showStatistics();
                  break;
      default: window.location = 'index.html'
    }
    avoidRepeat = choice;
}

// teams category
function showTeams() {
  table.classList.add('category-container', 'justify-content-center', 'bg-dark', 'bg-opacity-50', 'rounded-5');
  table.innerHTML = "<h2 class='sub-title'>NBA Team Information</h2>";
  
  const teamAndDescContainer = document.createElement('div');
  table.appendChild(teamAndDescContainer);
  teamAndDescContainer.className = 'teams-desc-container px-4 py-4 mx-auto bg-light bg-opacity-25 rounded-5';
  
  const newDiv1 = document.createElement('div');
  const newDiv2 = document.createElement('div');
  const teamContainer = teamAndDescContainer.appendChild(newDiv1);
  teamContainer.className = 'left-container'

  const newDiv3 = document.createElement('div');
  const newDiv4 = document.createElement('div');
  const categoryTitle = teamContainer.appendChild(newDiv3);
  categoryTitle.className = 'category-title bg-transparent fs-4 ';
  categoryTitle.textContent = 'Teams';
  const listTeam = teamContainer.appendChild(newDiv4);
  listTeam.className = 'list-team bg-transparent fs-6 ';

  const descContainer = teamAndDescContainer.appendChild(newDiv2);
  
  
  // Team description on hover
  let t1 = document.createElement('div');
  let t2 = document.createElement('div');
  let t3 = document.createElement('div');
  let t4 = document.createElement('div');
  const tDiv1 = descContainer.appendChild(t1);
  const tDiv2 = descContainer.appendChild(t2);
  const tDiv3 = descContainer.appendChild(t3);
  const tDiv4 = descContainer.appendChild(t4);
  tDiv1.className = 'desc-nba-logo t-div1 desc-item'
  tDiv2.className = 'desc-team-logo t-div2 desc-item'
  tDiv3.className = 'desc-conference t-div3 desc-item'
  tDiv4.className = 'desc-division t-div4 desc-item'

    // conference and division containers
    const oneDiv = document.createElement('div');
    const twoDiv = document.createElement('div');
    const confContainer = tDiv3.appendChild(oneDiv);
    const divisionContainer = tDiv4.appendChild(twoDiv);
    confContainer.className = 'conference fs-3 px-3 pt-1 pb-3 mt-3 border border-3 border-dark shadow rounded-3';
    divisionContainer.className = 'division fs-3 px-3 pt-1 pb-3 border border-3 border-dark shadow rounded-3';
    confContainer.textContent = 'CONFERENCE:';
    divisionContainer.textContent = 'DIVISION:';
    
    const child1Div = document.createElement('div');
    const child2Div = document.createElement('div');
    const conferenceValue = confContainer.appendChild(child1Div);
    const divisionValue = divisionContainer.appendChild(child2Div);
    conferenceValue.className = 'conf-value fs-4 text-light d-flex justify-content-center';
    divisionValue.className = 'division-value fs-4 text-light d-flex justify-content-center';


  // removing duplicates
  const newTeams = teams.reduce((accumulator, currentValue) => {
    if (!accumulator.includes(currentValue)) {
      return [...accumulator, currentValue]
    }
    return accumulator;
  }, []);

  // teams handling values when mouse over
  function handleMouseOver(key) {
    let team = teams[key];
    let arrTeamName = team.split(" ");
    let lastString = arrTeamName[arrTeamName.length - 1].toLowerCase();
    let conf = conference[key];
    let divi = division[key];
    if (lastString === '76ers') {
      lastString = 'p76ers';
    }
    descContainer.className = 'desc-container col-7 bg-dark bg-opacity-25 rounded-5 border border-2 border-warning';
    descContainer.style.animation = 'appear 1s ease',
                                    'enlarge 2s ease';
    tDiv1.innerHTML = `<img src='images/nba-logo2.png' class='logo-nba desc-nba-logo' />`
    tDiv2.innerHTML = `<img src='images/team/${lastString}.png' class='logo-team info-team-logo' />`

    conferenceValue.textContent = conf;
    divisionValue.textContent = divi;
  }


  // showing list of teams on left side with corresponding logo
  for (let j = 0; j < newTeams.length; j++) {
    const createDiv = document.createElement('div');
    const newDiv = listTeam.appendChild(createDiv);  
    
    let arrTeamName = newTeams[j].split(' ');
    let lastString = arrTeamName[arrTeamName.length - 1].toLowerCase();

    if (lastString === '76ers') {
      lastString = 'p76ers';
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
  }

  // adding event listeners to teams
    const addListenToTeams = document.querySelectorAll('.team-content');
    addListenToTeams.forEach(team => {
      team.addEventListener('mouseover', (e) => {
        let chosenTeam = e.target.innerText;
        let teamIndex = teams.indexOf(chosenTeam);
        handleMouseOver(teamIndex);
      });
    });
}



// players category
function showPlayers() {

  table.classList.add('player-category-container', 'category-container', 'max-height-75', 'justify-content-center', 'bg-dark', 'bg-opacity-50', 'rounded-5');
  table.innerHTML = "<h2 class='sub-title'>NBA Player Information</h2>";
  
  const playerAndDescContainer = document.createElement('div');
  table.appendChild(playerAndDescContainer);
  playerAndDescContainer.className = 'teams-desc-container px-4 py-4 mx-auto bg-light bg-opacity-25 rounded-5';
  
  const newDiv1 = document.createElement('div');
  const newDiv2 = document.createElement('div');
  const playerContainer = playerAndDescContainer.appendChild(newDiv1);
        playerContainer.className = 'left-container player-col-container'

  const newDiv3 = document.createElement('div');
  const newDiv4 = document.createElement('div');
  const categoryTitle = playerContainer.appendChild(newDiv3);
        categoryTitle.className = 'category-title bg-transparent fs-4 ';
        categoryTitle.textContent = 'Players';
  const listPlayer = playerContainer.appendChild(newDiv4);
        listPlayer.className = 'list-team scroll bg-transparent fs-6 ';

  const descContainer = playerAndDescContainer.appendChild(newDiv2);

  // Player description on hover
  let t1 = document.createElement('div');
  let t2 = document.createElement('div');
  let t3 = document.createElement('div');
  let t4 = document.createElement('div');
  const tDiv1 = descContainer.appendChild(t1);
  const tDiv2 = descContainer.appendChild(t2);
  const tDiv3 = descContainer.appendChild(t3);
  const tDiv4 = descContainer.appendChild(t4);
  tDiv1.className = 'desc-nba-logo t-div1 desc-item'
  tDiv2.className = 'desc-team-logo t-div2 desc-item'
  tDiv3.className = 'desc-conference t-div3 desc-item'
  tDiv4.className = 'desc-division t-div4 desc-item'

  // team name and position containers
  const oneDiv = document.createElement('div');
  const twoDiv = document.createElement('div');
  const playerTeamContainer = tDiv3.appendChild(oneDiv);
  const playerPositionContainer = tDiv4.appendChild(twoDiv);
  playerTeamContainer.className = 'conference fs-3 px-3 pt-1 pb-3 mt-3 border border-3 border-dark shadow rounded-3';
  playerPositionContainer.className = 'division fs-3 px-3 pt-1 pb-3 border border-3 border-dark shadow rounded-3';
  playerTeamContainer.textContent = 'TEAM:';
  playerPositionContainer.textContent = 'POSITION:';
  
  const child1Div = document.createElement('div');
  const child2Div = document.createElement('div');
  const playerTeamValue = playerTeamContainer.appendChild(child1Div);
  const playerPositionValue = playerPositionContainer.appendChild(child2Div);
  playerTeamValue.className = 'conf-value fs-4 text-light d-flex justify-content-center';
  playerPositionValue.className = 'division-value fs-4 text-light d-flex justify-content-center';


  // players handling values when mouse over
  function handleMouseOver(key) {
    let team = teams[key];
    let pPosition = playersPosition[key];
    let fName = playersFirstName[key];
    if (playersFirstName[key] === 'Zach') {
      fName = (playersLastName[key] === 'Lofton') ? 'ZachL' : 'ZachR';
    }
    if (playersFirstName[key] === 'Michael') {
      fName = (playersLastName[key] === 'Smith') ? 'MichaelS' : 'MichaelA';
    }
  
    descContainer.className = 'right-container player-desc-container col-7 bg-dark bg-opacity-25 rounded-5 border border-2 border-warning';
    descContainer.style.animation = 'appear 1s ease',
                                    'enlarge 2s ease';
    tDiv1.innerHTML = `<img src='images/nba-logo2.png' class='logo-nba desc-nba-logo' />`
    tDiv2.innerHTML = `<img src='images/players/${fName}.png' class='logo-team info-player-pic' />`

    playerTeamValue.textContent = team;
    playerPositionValue.classList.add('text-light');

    switch(pPosition) {
      case 'F': pPosition = 'Forward';
                break;
      case 'G': pPosition = 'Guard';
                break;    
      case 'C': pPosition = 'Center';
                break;
      case 'C-F': pPosition = 'Center-Forward';
                break;
      case 'F-C': pPosition = 'Forward-Center';
                break;
      case 'G-F': pPosition = 'Guard-Forward';
                break; 
      case 'F-C': pPosition = 'Forward-Center';
                break;
      case '': pPosition = 'No record on file';
                playerPositionValue.classList.remove('text-light');
                playerPositionValue.style.color = "tomato";
                break;
    }
    playerPositionValue.textContent = pPosition;
  }

    // showing list of players on left side with corresponding logo
    for (let j = 0; j < playersFirstName.length; j++) {
      const createDiv = document.createElement('div');
      const newDiv = listPlayer.appendChild(createDiv);  
  
      let arrTeamName = teams[j].split(" ");
      let lastString = arrTeamName[arrTeamName.length - 1].toLowerCase();
  
      if (lastString === '76ers') {
        lastString = 'p76ers';
      }
  
      let newSpanLogo = document.createElement('span');
      let spanLogo = listPlayer.appendChild(newSpanLogo);
  
      newDiv.textContent = playersFullName[j];
      spanLogo.innerHTML = `<img class="team-logo p2" src="images/team/${lastString}.png">`;
  
      newDiv.style.animation = 'enlarge 4s ease forwards';
      newDiv.className = 'team-content text-light bg-opacity-75 px-3 py-1 fs-6 ';
  
      newDiv.setAttribute('id', lastString);
      let addListen = document.getElementById(lastString);
      newDiv.setAttribute('data-alias', lastString);
    }

  // adding event listeners to players
  const addListenToPlayers = document.querySelectorAll('.team-content');
  addListenToPlayers.forEach(player => {
    player.addEventListener('mouseover', (e) => {
      let chosenPlayer = e.target.innerText;
      let playerIndex = playersFullName.indexOf(chosenPlayer);
      handleMouseOver(playerIndex);
    });
  });
}


connectAPI();
listenTo();