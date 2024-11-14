// SocketContext.tsx
import React, { createContext, ReactNode } from 'react';
import io from 'socket.io-client';

// Specify type as `SocketIOClient.Socket | null` if using TypeScript
export const SocketContext = createContext<SocketIOClient.Socket | null>(null);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const socket: SocketIOClient.Socket = io('http://localhost:4500');

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
