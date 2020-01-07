// add event listener to the keyup event on the text input to fetch github userdata from their api and display it
document.getElementById('searchBox').addEventListener('keyup', (e) => {

    if (e.target.value) {

        fetch(`https://api.github.com/users/${e.target.value}?client_id=0ae99cdb371eb6a45da0&client_secret=949466757c62eb19eb7f9a0ab0e8f23d5bba7ee8`)
            .then(response => response.json())
            .then(result => {
                if (result.message === 'Not Found') {

                    document.getElementById('errorBox').classList.toggle('d-none');
                    document.getElementById('userImg').innerHTML = '';
                    document.getElementById('publicRepos').innerHTML = '';
                    document.getElementById('publicGists').innerHTML = '';
                    document.getElementById('followers').innerHTML = '';
                    document.getElementById('following').innerHTML = '';
                    document.getElementById('profileButtonSect').innerHTML = '';
                    document.getElementById('reposList').innerHTML = '';

                    setTimeout(() => {
                        document.getElementById('errorBox').classList.add('d-none');

                    }, 5000)
                } else {
                    document.getElementById('errorBox').classList.add('d-none');
                    document.getElementById('userImg').innerHTML = "";
                    let img = document.createElement('img');
                    img.id = 'userImg';
                    img.src = `${result.avatar_url}`;
                    img.classList = 'img-fluid my-3';
                    img.alt = 'User profile Image';
                    document.getElementById('userImg').appendChild(img);
                    document.getElementById('publicRepos').innerText = `Public Repos: ${result.public_repos}`;
                    document.getElementById('publicGists').innerText = `Public Gists: ${result.public_gists}`;
                    document.getElementById('followers').innerText = `Followers: ${result.followers}`;
                    document.getElementById('following').innerText = `Following: ${result.following}`;
                    let theBtn = `<a id="profileBtn" target="_blank" rel="noopener noreferrer">
            <button id="viewProfile" class="btn btn-block blue-gradient mb-3">View profile</button>
        </a>`;
                    document.getElementById('profileButtonSect').innerHTML = theBtn;
                    document.getElementById('profileBtn').setAttribute('href', `${result.html_url}`);
                    let reposUrl = `${result.repos_url}`;
                    return reposUrl


                }
            })
            .then(url => {
                fetch(url)
                    .then(response => response.json())
                    .then(json => {
                        document.getElementById('reposList').innerHTML = '';
                        json.forEach(item => {
                            let repsoList = document.getElementById('reposList');
                            repsoList.innerHTML += `
                <li class="list-group-item d-flex">
                <p class="">${item.name}</p>
                <div class="d-inline ml-auto">
                    <h6 class="d-inline"><span class="badge badge-primary custom-badge">Stars: ${item.stargazers_count}</span></h6>
                    <h6 class="d-inline"><span class="badge badge-default custom-badge">Watchers: ${item.watchers_count}</span></h6>
                    <h6 class="d-inline"><span class="badge badge-secondary custom-badge">Forks: ${item.forks}</span></h6>
                </div>
            </li>`;
                        })
                    })
            })

    }
})