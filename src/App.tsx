import { init } from "@instantdb/react";

const db = init({ appId: "2b22f98c-404b-496a-a54b-9da410b7931e" });

const randomId = Math.random().toString(36).slice(2, 6);
const user = {
  name: `User#${randomId}`,
};

const room = db.room("chat", "main");

export default function InstantTypingIndicator() {
  // 1. Publish your presence in the room.
  room.useSyncPresence(user);

  // 2. Use the typing indicator hook
  const typing = room.useTypingIndicator("chat");

  const onKeyDown = (e: any) => {
    // 3. Render typing indicator
    typing.inputProps.onKeyDown(e);

    // 4. Optionally run your own onKeyDown logic
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      console.log("Message sent:", e.target.value);
    }
  };

  return (
    <div className="flex h-screen gap-3 p-2">
      <div key="main" className="flex flex-1 flex-col justify-end">
        <textarea
          onBlur={typing.inputProps.onBlur}
          onKeyDown={onKeyDown}
          placeholder="Open two tabs and start typing..."
          className="w-full rounded-md border-gray-300 p-2 text-sm"
        />
        <div className="truncate text-xs text-gray-500">
          {typing.active.length ? typingInfo(typing.active) : <>&nbsp;</>}
        </div>
      </div>
    </div>
  );
}

function typingInfo(users: any[]) {
  if (users.length === 0) return null;
  if (users.length === 1) return `${users[0].name} is typing...`;
  if (users.length === 2)
    return `${users[0].name} and ${users[1].name} are typing...`;

  return `${users[0].name} and ${users.length - 1} others are typing...`;
}
