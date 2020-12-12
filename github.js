class GitHub {

    constructor() {
        this.client_id = '8bf823c6a8faa2fc4728';
        this.client_secret = '50d8d6c534d47aff23fcb2071c1229f313936287';
        this.repos_count = 5;
        this.repos_sort = 'created: asc';
    }

    async getUser(user,page) {
        let profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);
        
        let repoResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&page=${page}&client_id=${this.client_id}&client_secret=${this.client_secret}`);

        let profile = await profileResponse.json();
        let repos = await repoResponse.json();
         
        return {
            profile,
            repos
        }

    }
}
