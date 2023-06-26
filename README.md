# Listening to the ethereum


## HTTPs

  HTTP/HTTPS is unidirectional - the client sends the request and then the server sends the response - and has no state associated with it, meaning each request gets one response and then the connection is terminated. You’ll want to use the HTTPS interface if you’re getting data that only needs to be collected once or if you’re accessing old data. You’ll see HTTPS used regularly with simple RESTful applications.


## WebSocket

  WebSockets are bidirectional and stateful, which means the connection between the client and the server is kept alive until it is terminated by either party (client or server). Once the connection is closed, it is terminated. The best time to use a WebSocket is when you want to continuously push/transmit data to the already-open connection, for example in cryptocurrency trading platforms, gaming applications, or chat applications, where you want the data to be updated constantly in real time.
