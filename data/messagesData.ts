export interface Message {
  id: number;
  name: string;
  message: string;
  time: string;
  status: string;
  avatar: string;
}

export const messagesData: Message[] = [
  {
    id: 1,
    name: "Rene Wells",
    message: "This is my message to about the request",
    time: "7:21AM",
    status: "read",
    avatar: "/requests-avatars/message-avatar1.png",
  },
  {
    id: 2,
    name: "Joshua Wilson",
    message: "Randomly thought about checking in on the request",
    time: "7:08AM",
    status: "read",
    avatar: "/requests-avatars/message-avatar2.png",
  },
  {
    id: 3,
    name: "Lori Bryan",
    message: "I'll like to visit in November, is that possible?",
    time: "Yesterday",
    status: "unread",
    avatar: "/requests-avatars/message-avatar3.png",
  },
  {
    id: 4,
    name: "Anaiah Williams",
    message: "Do you have any heating?",
    time: "Yesterday",
    status: "read",
    avatar: "/requests-avatars/message-avatar4.png",
  },
  {
    id: 5,
    name: "Noah Pierre",
    message: "Yes",
    time: "Yesterday",
    status: "read",
    avatar: "/requests-avatars/message-avatar5.png",
  },
  {
    id: 6,
    name: "Katherine Moss",
    message: "No, I would like to add that into the request",
    time: "Yesterday",
    status: "read",
    avatar: "/requests-avatars/message-avatar6.png",
  },
  {
    id: 7,
    name: "Edward Franz",
    message: "Cool, I will book now!",
    time: "3/26/23",
    status: "unread",
    avatar: "/requests-avatars/message-avatar7.png",
  },
  {
    id: 8,
    name: "Alec Whitten",
    message: "I just have a shower with a curtain",
    time: "3/26/23",
    status: "read",
    avatar: "/requests-avatars/message-avatar8.png",
  },
];
