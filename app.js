//init gitHub
const gitHub = new GitHubFetch;

//init ui
const ui = new UI;

//get search field from html and assign to var
let searchInput = document.getElementById('searchInput');

//Event Listener for search field key-up event.  If user presses key and does not press another key for 500ms, function 'getUser' will be called
searchInput.addEventListener('keyup', (e) => {
    let userText = e.target.value;
    setTimeout(function () {
        if (userText === searchInput.value) {
            getUser(userText);
        }
    }, 500)
})

//search github user
function getUser(userText) {

    //if user text is not blank, fetch user information from github API.
    if (userText != '') {
        gitHub.getUser(userText)
            //once fetch is complete check if user was found.
            .then(data => {
                //if user not found, call showAlert function
                if (data.profile.message === 'Not Found') {
                    ui.showAlert('Profile not found')
                } 
                // otherwise call functions to show profile and repos
                else {
                    //show profile
                    ui.printProfile(data.profile);
                    ui.printRepos(data.repos, data.profile.public_repos);
                }
            })
    } 
    // if search field is blank call clearPage function
    else {
        ui.clearPage();
    }

}

//Event Listener for load more button. Since load more button is dynamically loaded, event delegation is used

document.querySelector('#profile').addEventListener('click', (e) => {
    if (e.target.id === 'loadMore') {
        document.getElementById('loadMore').innerHTML = `<img src="images/load.svg">`;
        
        //divide number of repos currently loaded by number of repos to be loaded + 1.  This determines which page number to request from github API
        gitHub.getUser(searchInput.value, (ui.repoDispCount / gitHub.repos_toLoad) + 1)
            .then(data => {
                if (data.profile.message === 'Not Found') {
                    //show alert if profile not found
                    ui.showAlert('There was an issue loading more repos')
                } else {
                    // call printMoreRepos function
                    ui.printMoreRepos(data.repos, data.profile.public_repos);
                }
            })
    };
})

