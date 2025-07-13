
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
</head>
<body>

  <h1>Elasticsearch NodeJS Project Setup</h1>

  <p><strong>Note:</strong></p>
  <p>To start:</p>
  <pre><code>npm run dev  // on backend folder</code></pre>
  <pre><code>node syncAllToElastic.js  // on backend/src/utils  // sync to existing data of mongo db</code></pre>
  

  <p>-Here I have used offline server-side Elasticsearch:</p>
  <ul>
    <li>Served at port <code>9200</code> using Docker</li>
  </ul>
 <p>-Client-side Elasticsearch provided by Node module: </p>
 <ul>
 <li><code>@elastic/elasticsearch<code></li>
</ul>
  <p><strong>Note:</strong> Version of client-side is <code>8.18.2</code> &amp; version on server-side is <code>8.13.4</code><br />
  Changing versions while installing may cause errors, so for testing stay with these versions, they are stable.</p>

  <h2>Server-side Elasticsearch Setup</h2>

  <p>You can use Docker to run Elasticsearch server or download it from the official website and run it locally.</p>

  <p>If you are using Docker, you can use the following command to run the Elasticsearch server:</p>

  <pre><code>docker run -d --name elasticsearch  -p 9200:9200 -e "discovery.type=single-node" -e "xpack.security.enabled=false"  docker.elastic.co/elasticsearch/elasticsearch:8.13.4</code></pre>

  <p>This will run the Elasticsearch server on port <code>9200</code>, and you can access it from <a href="http://localhost:9200" target="_blank">http://localhost:9200</a>.</p>

  <p>For further Docker setup, you can refer to the official documentation of Docker and Elasticsearch.</p>

  <p><strong>Note:</strong> Other setups are same as usual Node.js project setup.</p>
 
<h2> # For Cloud services of server side ElasticSearch</h2>
  <p> - Replace :</p>
  <code>const client = new Client({ node: 'http://localhost:9200' });
</code>
<p>By: example</p>
  <code> const client = new Client({
  node: 'https://your-cluster-id.region.cloud.es.io',
  auth: {
    username: 'elastic',
    password: 'your_password'
  }
});
</code>
</body>
</html>
