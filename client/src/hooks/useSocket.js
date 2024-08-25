// in hooks/useSocket.js
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

function useSocket(url) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(url);
    
    newSocket.on('connect', () => {
      console.log('Socket connected');
      setSocket(newSocket);
    });

    return () => {
      if (newSocket) newSocket.close();
    };
  }, [url]);

  return socket;
}

export default useSocket;