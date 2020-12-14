//init gitHub
const gitHub = new GitHub;

//init ui
const ui = new UI;

let repoDispCount = 0;
let userRepoCount = 0;

//Search Input

let searchUser = document.getElementById('searchUser');


//Event Listener for search
searchUser.addEventListener('keyup', function(e){
    let userText = e.target.value;
     setTimeout(function(){
        if(userText === searchUser.value){
            search(userText);
            
        }
    },250)
})
                            
function search(userText){
    //get input text

    repoDispCount = 0;

    if (userText != '') {
        gitHub.getUser(userText)
            .then(data => {
                if (data.profile.message === 'Not Found') {
                    //show alert
                    ui.showAlert('Profile not found')
                } else {
                    //show profile
                    ui.showProfile(data.profile);
                    ui.showRepos(data.repos, data.profile.public_repos);
                }
            })
    } else {
        ui.clearProfile();
        //clear profile
    }

}

//Event Listener for load button

document.querySelector('#profile').addEventListener('click',function(e){
    if(e.target.id === 'loadMore'){
        document.getElementById('loadMore').innerHTML = `<img src="images/load.svg">`;
        gitHub.getUser(searchUser.value,(repoDispCount / 5) + 1)
        .then(data => {
                if (data.profile.message === 'Not Found') {
                    //show alert
                    ui.showAlert('Profile not found')
                } else {
                    //show profile
                    ui.loadRepos(data.repos, data.profile.public_repos);
                }
            })
    };
})

//calculte amount of repos displayed
async function incrementDisplayCount(x,y){
    userRepoCount = y;
    repoDispCount += x;
    return repoDispCount;
}
