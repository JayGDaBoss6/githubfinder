document.getElementById('searchBox').addEventListener('keyup', (e) => {

  const myHeaders = new Headers();
  myHeaders.append("Authorization", "34222c900c2364a2f2f297bf90f1930f2b394c92 OAUTH-TOKEN");
  myHeaders.append("Authorization", "Bearer 34222c900c2364a2f2f297bf90f1930f2b394c92");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };


  fetch(`https://api.github.com/users/${e.target.value}`, requestOptions)
    .then(response => response.json())
    .then(result => {




        if (e.target.value) {
          document.getElementById('userImg').innerHTML = "";
          console.log(result)

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
          document.getElementById('profileBtn').href = `${result.html_url}`;

        }
      }

    )
    .catch(error => console.log('error', error));

});