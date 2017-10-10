var request = require("request");
var fs =require("fs");


console.log("Welcome the GitHub Avatar Downloader!");

var username ="KaiTang26";

var token ="74c5f784be3ba813fe93f71053f3942e0cc68681";

var owner =process.argv[2];

var repo =process.argv[3];


function getRepoContrubutors(repoOwner, repoName, cb){

  var url =`https://${username}:${token}@api.github.com/repos/${repoOwner}/${repoName}/contributors`;

  var options = {
    url: url,
    headers: {
      'User-Agent': 'project1',

    }
  }

  request(options, function(error, response, body) {
    var bodyJson = JSON.parse(body);
    cb(error, bodyJson);
  })

}

function downloadImageByURL(imURL,filePath){
  request.get(imURL)
         .on("error", function(err){
           console.log(err);
         })
         .on("response", function(response){
          console.log("status code: ",response.statusCode)
         })
         .pipe(fs.createWriteStream(filePath));
}


if(owner && repo){

  getRepoContrubutors(owner, repo, function(err, result){

    if (err) {
      console.log("Error: ", err);
    } else {

    // console.log(result);

      result.forEach(function(ele){
        downloadImageByURL(ele["avatar_url"], `./avatars/${ele.login}.jpg` );
      });
    }

  });

}else{

  console.log("please input owner and repo name");

}








