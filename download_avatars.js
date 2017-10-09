var request = require("request");
var fs =require("fs");


console.log("Welcome the GitHub Avatar Downloader!");

var username ="KaiTang26";

var token ="8ea38c7465e183ce3b8d388bfe623f03e57d786b";

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

getRepoContrubutors("jquery", "jquery", function(err, result){

  if (err) {
    console.log("Error: ", err);
  } else {
    result.forEach(function(ele){
      downloadImageByURL(ele["avatar_url"], `./avatars/${ele.login}.jpg` );
    });
  }

});

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




