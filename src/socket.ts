import io from 'socket.io-client';

interface StudentData {
  student_code: string;
  full_name: string;
  first_name: string;
  middle_name?: string; // Optional middle name
  last_name: string;
  schoolCode: string;
  academicYear: string;
}

export interface SocketEvents {
  students_received: { message: string };
  new_student: StudentData;
  duplicate_student: StudentData;
}

class SocketConnection {
  private static instance: SocketConnection;
  private socket: SocketIOClient.Socket;

  private constructor() {
    this.socket = io('http://localhost:6200');
  }

  public static getInstance(): SocketConnection {
    if (!SocketConnection.instance) {
      SocketConnection.instance = new SocketConnection();
    }
    return SocketConnection.instance;
  }

  public on<K extends keyof SocketEvents>(
    event: K,
    callback: (data: SocketEvents[K]) => void
  ): void {
    this.socket.on(event, callback as (...args: any[]) => void);
  }

  public emit<K extends keyof SocketEvents>(
    event: K,
    data: SocketEvents[K]
  ): void {
    this.socket.emit(event, data);
  }
}

const socketInstance = SocketConnection.getInstance();
Object.freeze(socketInstance);
export default socketInstance;
