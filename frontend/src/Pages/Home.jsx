import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar"
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import useChatStore from "../StateStore/chatStore";

const Home = () => {
  const { selectedUser } = useChatStore();
  console.log(selectedUser)
  return (
    <>
      <Navbar />
      <div className="h-screen bg-base-200">
        <div className="flex items-center justify-center pt-20 px-4">
          <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
            <div className="flex h-full rounded-lg overflow-hidden">
              <Sidebar />

              {!selectedUser ? <NoChatSelected /> : <ChatContainer/>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
