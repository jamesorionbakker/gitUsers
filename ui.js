class UI {
    constructor() {
        this.profile = document.getElementById('profile');
    }

    showProfile(user) {
        this.profile.innerHTML = `
<div class="card-body card mb-3 main-card">
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
<h3 class="page-heading mb-3">Latest Repos</h3>
<div id="repos"></div>`;
        $( ".main-card" ).fadeIn( 300 );

    }

    async showRepos(repos, repoCount) {
        let output = '';
        let loopCount = 0;

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
            
            loopCount ++;
        })
        document.getElementById('repos').insertAdjacentHTML('beforeend',output);
        $( ".repo-card" ).fadeIn( 300 );
        let reposDisplayed = await incrementDisplayCount(loopCount, repoCount);
        
        //console.log `${reposDisplayed} < ${repoCount}`
        
       if(reposDisplayed < repoCount){
            document.getElementById('repos').insertAdjacentHTML('beforeend', `<button class="btn btn-primary btn-block mb-4 mt-4" id="loadMore">Load More Repos</button>`);
           $( "#loadMore" ).fadeIn( 300 );
        }
    }
    
        async loadRepos(repos, repoCount) {
        let output = '';
        let loopCount = 0;
        let loadButton = document.querySelector('#loadMore');
            
        document.getElementById('loadMore').innerHTML = `<img src="images/load.svg">`;

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
            loopCount ++;
        })
        document.getElementById('repos').insertAdjacentHTML('beforeend',output);
        $( ".repo-card" ).fadeIn( 300 );
        let reposDisplayed = await incrementDisplayCount(loopCount, repoCount);
        
        //console.log `${reposDisplayed} < ${repoCount}`
        loadButton.remove();
        if(reposDisplayed < repoCount){
            document.getElementById('repos').insertAdjacentHTML('beforeend', `<button class="btn btn-primary btn-block mb-4 mt-4" id="loadMore">Load More Repos</button>`);
            $( "#loadMore" ).fadeIn( 300 );
        }
    }
    
    
    clearProfile() {
        this.profile.innerHTML = '';
    }
    showAlert(msg) {
        let alertDiv = document.getElementById('alert');
        alertDiv.innerHTML = msg;
        $(alertDiv).fadeIn(200);
        setTimeout(() => {
            $(alertDiv).fadeOut(200);
        }, 2000)
    }
}
