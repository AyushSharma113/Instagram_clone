
export interface Comment {
  _id?: string;          // optional because not shown in your screenshot
  user: {
    _id: string;
    username: string;
    profilePicture?: string;
  };         // optional if backend sometimes omits full user object
  text?: string;         // optional because not shown
  createdAt: string;     // ISO timestamp (e.g. "2025-10-23T13:20:28.653Z")
}