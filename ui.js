class UI {
    constructor() {
        this.profile = document.getElementById('profile');
    }

    showProfile(user) {
        this.profile.innerHTML = `
<div class="card-body card mb-3">
    <div class="row">
        <div class="col-md-3">
            <img src="${user.avatar_url}" alt="" class="img-fluid mb-2">
            <a href="${user.html_ur}" target="_blank" class="btn btn-primary btn-block mb-4">View Profile</a>
        </div>
        <div class="col-md-9">
                <span class="badge badge-primary">Repos: ${user.public_repos}</span>
                <span class="badge badge-secondary">Gists: ${user.public_gists}</span>
                <span class="badge badge-success">Followers: ${user.followers}</span>
                <span class="badge badge-primary">Following: ${user.following}</span>
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

    }

    async showRepos(repos, repoCount) {
        let output = '';
        let loopCount = 0;

        repos.forEach(function (repo) {
            output += `
                <div class="card card-body mb-2">
                    <div class="row">
                        <div class="col-md-4">
                            <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                        </div>
                        <div class="col-md-8">
                            <span class="badge badge-primary">Stars: ${repo.stargazers_count}</span>
                                <span class="badge badge-secondary">Watchers: ${repo.watchers_count}</span>
                                <span class="badge badge-success">Forks: ${repo.forks_count}</span>
                        </div>
                    </div>
                </div>
            `;
            loopCount ++;
        })
        document.getElementById('repos').insertAdjacentHTML('beforeend',output);
        let reposDisplayed = await incrementDisplayCount(loopCount, repoCount);
        
        //console.log `${reposDisplayed} < ${repoCount}`
        
       if(reposDisplayed < repoCount){
            document.getElementById('repos').insertAdjacentHTML('beforeend', `<button class="btn btn-primary btn-block mb-4 mt-4" id="loadMore">Load More Repos</button>`);
        }
    }
    
        async loadRepos(repos, repoCount) {
        let output = '';
        let loopCount = 0;
        let loadButton = document.querySelector('#loadMore');

        repos.forEach(function (repo) {
            output += `
                <div class="card card-body mb-2">
                    <div class="row">
                        <div class="col-md-4">
                            <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                        </div>
                        <div class="col-md-8">
                            <span class="badge badge-primary">Stars: ${repo.stargazers_count}</span>
                                <span class="badge badge-secondary">Watchers: ${repo.watchers_count}</span>
                                <span class="badge badge-success">Forks: ${repo.forks_count}</span>
                        </div>
                    </div>
                </div>
            `;
            loopCount ++;
        })
        
            document.getElementById('navbar').focus();
        document.getElementById('repos').insertAdjacentHTML('beforeend',output);
        let reposDisplayed = await incrementDisplayCount(loopCount, repoCount);
        
        //console.log `${reposDisplayed} < ${repoCount}`
        loadButton.remove();
        if(reposDisplayed < repoCount){
            document.getElementById('repos').insertAdjacentHTML('beforeend', `<button class="btn btn-primary btn-block mb-4 mt-4" id="loadMore">Load More Repos</button>`);
        }
    }
    
    
    clearProfile() {
        this.profile.innerHTML = '';
    }
    showAlert(msg) {
        let alertDiv = document.getElementById('alert');
        alertDiv.innerHTML = msg;
        alertDiv.style.display = 'block';
        setTimeout(() => {
            alertDiv.style.display = 'none';
        }, 2000)
    }
}
