import { messagesData } from "@/data/messagesData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const truncateText = (text: string, maxLength = 30) => {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

const MessageBar = () => {
  return (
    <div className="text-[#323F4B]">
      <h3 className="sr-only">Messages</h3>
      <div className="flex gap-4  overflow-auto pb-3">
        {messagesData.map(({ id, name, message, avatar, time }) => (
          <div key={id} className="flex items-start gap-3">
            <Avatar className="size-9">
              <AvatarImage src={avatar} alt={name} />
              <AvatarFallback>
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0 space-y-2">
              <p className="flex justify-between gap-12 text-sm text-foreground text-nowrap">
                <span className="font-medium">{name}</span>
                <span className="text-xs text-muted-foreground">{time}</span>
              </p>
              <p className="text-sm text-muted-foreground text-nowrap">
                {truncateText(message)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageBar;
