export async function getTasks(user) {
  let url = new URL("http://localhost:8000/getTasks");
  let params = { userId: user.id };
  url.search = new URLSearchParams(params).toString();

  let response = await fetch(url);
  let data = await response.json();
  return data;
}

export async function getUsers() {
  let url = new URL("http://localhost:8000/getUsers");
  let response = await fetch(url);
  let data = await response.json();

  return data;
}

export async function markCompleted(user, task) {
  const XHR = new XMLHttpRequest();


  let urlEncodedDataPairs = [];
  urlEncodedDataPairs.push( encodeURIComponent( "userId" ) + '=' + encodeURIComponent( user.id ) );
  urlEncodedDataPairs.push( encodeURIComponent( "taskId" ) + '=' + encodeURIComponent( task.id ) );
  let urlEncodedData = urlEncodedDataPairs.join( '&' ).replace( /%20/g, '+' );

  XHR.open( 'POST', 'http://localhost:8000/completeTask' );
  XHR.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
  XHR.send( urlEncodedData );
}

export async function addTask(formData) {
  const XHR = new XMLHttpRequest();

  let urlEncodedData = "",
        urlEncodedDataPairs = [],
        name;

  // Turn the data object into an array of URL-encoded key/value pairs.
  for( name in formData ) {
    urlEncodedDataPairs.push( encodeURIComponent( name ) + '=' + encodeURIComponent( formData[name] ) );
  }

  // Combine the pairs into a single string and replace all %-encoded spaces to 
  // the '+' character; matches the behaviour of browser form submissions.
  urlEncodedData = urlEncodedDataPairs.join( '&' ).replace( /%20/g, '+' );

  XHR.addEventListener( 'load', function(event) {
    alert( 'Yeah! Data sent and response loaded.' );
  } );

  XHR.addEventListener( 'error', function(event) {
    alert( 'Oops! Something went wrong.' );
  } );

  XHR.open( 'POST', 'http://localhost:8000/tasks' );
  XHR.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
  XHR.send( urlEncodedData );
}