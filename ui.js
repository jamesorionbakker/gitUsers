class UI {
    constructor() {
        this.profile = document.getElementById('profile');
        this.repoDispCount = 0;
        //this.userRepoCount = 0;
    }

    //print profile info fn
    printProfile(user) {
        //Animate Search bar to docked position at top
        $('#searchInput').animate({
            height: "46px",
            top: "0px"
        }, 500);
        
        //Print profile info
        this.profile.innerHTML =
            `<div class="card-body card mb-3 main-card">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${user.avatar_url}" alt="" class="img-fluid mb-2 avatar-img">
                        <a href="${user.html_ur}" target="_blank" class="profile-button btn btn-primary btn-block mb-4">View Profile</a>
                    </div>
                    <div class="col-md-9">
                            <span class="badge ">Repos: ${user.public_repos}</span>
                            <span class="badge">Gists: ${user.public_gists}</span>
                            <span class="badge">Followers: ${user.followers}</span>
                            <span class="badge">Following: ${user.following}</span>
                        <br><br>
                        <ul class="list-group">
                            <li class="list-group-item">Company: ${user.company}</li>
                            <li class="list-group-item">Website/Blog: ${user.blog}</li>
                            <li class="list-group-item">Location: ${user.location}</li>
                            <li class="list-group-item">Member Sincs: ${user.created_at}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <h3 class="page-heading mb-3 repo-heading">Latest Repos</h3>
            <div id="repos"></div>`;

        //Fade in User Info
        $(".main-card").delay(500).fadeIn(300);

    }

    //Print user repos fn
    async printRepos(repos, totalRepos) {

        //init output var and loop counter to track number of posts loaded
        let output = '';
        let loopCount = 0;

        //loop through repos from github.js and append to 'output'
        repos.forEach(function (repo) {
            output += `
                <div class="card card-body mb-2 repo-card">
                    <div class="row">
                        <div class="col-md-4">
                            <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                        </div>
                        <div class="col-md-8">
                            <span class="badge">Stars: ${repo.stargazers_count}</span>
                                <span class="badge">Watchers: ${repo.watchers_count}</span>
                                <span class="badge">Forks: ${repo.forks_count}</span>
                        </div>
                    </div>
                </div>
            `;

            loopCount++;
        })
        
        //print 'output'
        document.getElementById('repos').insertAdjacentHTML('beforeend', output);

        //fade in repos
        $(".repo-heading").delay(500).fadeIn(300);
        $(".repo-card").delay(500).fadeIn(300);
    
        //set repoDispCount to number of repos loaded
        this.repoDispCount = loopCount;
        
        //if user has more repos than are currently displayed, print 'load more' button
        if (this.repoDispCount < totalRepos) {
            document.getElementById('repos').insertAdjacentHTML('beforeend', `<button class="btn btn-primary btn-block mb-4 mt-4" id="loadMore">Load More Repos</button>`);
            //fade in load button
            $("#loadMore").delay(500).fadeIn(300);
        }
    }

    // Load more repos function
    async printMoreRepos(repos, totalRepos) {
        let output = '';
        let loopCount = 0;
        let loadButton = document.querySelector('#loadMore');

        //display loading svg image
        document.getElementById('loadMore').innerHTML = `<img src="images/load.svg">`;

        //loop through each repo object and append 'output' with html
        repos.forEach(function (repo) {
            output += 
                `<div class="card card-body mb-2 repo-card">
                    <div class="row">
                        <div class="col-md-4">
                            <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                        </div>
                        <div class="col-md-8">
                            <span class="badge">Stars: ${repo.stargazers_count}</span>
                                <span class="badge">Watchers: ${repo.watchers_count}</span>
                                <span class="badge">Forks: ${repo.forks_count}</span>
                        </div>
                    </div>
                </div>`;
            //count number of loops ran
            loopCount++;
        })

        //print 'output'
        document.getElementById('repos').insertAdjacentHTML('beforeend', output);
        
        //fade in loaded repos
        $(".repo-card").fadeIn(300);

        //append repo counter with number of repos loaded
        this.repoDispCount += loopCount;
       
        //remove clicked load button
        loadButton.remove();

        //if user has more repos than are currently displayed, print 'load more' button
        if (this.repoDispCount < totalRepos) {
            document.getElementById('repos').insertAdjacentHTML('beforeend', 
                `<button class="btn btn-primary btn-block mb-4 mt-4" id="loadMore">Load More Repos</button>`);
            
            // fade in load button
            $("#loadMore").fadeIn(300);
        }
    }

    //clear page function
    clearPage() {
        this.profile.innerHTML = '';
        this.repoDispCount = 0;
        $('#searchInput').animate({height: "100px",top: "100px"}, 500);
        
    }
    //show alert if user not found
    showAlert(msg) {
        let alertDiv = document.getElementById('alert');
        alertDiv.innerHTML = msg;
        $(alertDiv).fadeIn(200);
        setTimeout(() => {$(alertDiv).fadeOut(200);}, 2000)
    }

}
