// useclient.js
import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import { useSelector } from "react-redux";

const client = StreamChat.getInstance("wcrrmgg99vdh");

export const useChatClient = () => {
  const { user } = useSelector((state) => {
    return state.User;
  });
  const [clientIsReady, setClientIsReady] = useState(false);
  const fetchUsers = async () => {
    const resp = await client.queryUsers({});
    setUsers(resp.users);
    setLoading(false);
  };

  useEffect(() => {
    const connectUser = async () => {
      await client.connectUser(
        {
          id: user.userID,
          name: user.name,
          image: user.avatar,
        },
        client.devToken(user.userID)
      );
      setClientIsReady(true);
    };

    if (!client.userID) {
      connectUser();
      fetchUsers();
    }
  }, []);

  return {
    clientIsReady,
  };
};
