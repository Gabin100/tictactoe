// In any React component
import React, { useContext } from 'react';
import { SocketContext } from './SocketContext';
import { SocketEvents } from './socket';

function SocketClient() {
  console.log('called!');

  const socket = useContext(SocketContext);

  // Listen for events directly
  if (socket) {
    socket.on('connect', () => {
      console.log('Connected to the server');
    });

    socket.on(
      'students_received',
      (data: SocketEvents['students_received']) => {
        console.log('Received students data:', data);
      }
    );

    socket?.on(
      'duplicate_student',
      (data: SocketEvents['duplicate_student']) => {
        console.log('Duplicate student:', data);
      }
    );

    socket.on('new_student', (data: SocketEvents['new_student']) => {
      console.log('New student:', data);
    });
  }
  return <div>SocketClient</div>;
}

export default SocketClient;
