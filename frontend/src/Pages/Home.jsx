import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar"
import NoChatSelected from "../Components/NoChatSelected"
import ChatContainer from "../Components/ChatContainer";
import useChatStore from "../StateStore/chatStore";
import useContactSidebar from "../StateStore/sidebar";


const Home = () => {
  const { selectedUser } = useChatStore();
  const {isOpen}=useContactSidebar()
  console.log(selectedUser)
  return (
    <>
      <Navbar />
      <div className="h-screen bg-base-200">
        <div className="flex items-center justify-center pt-20 px-4">
          <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
            <div className="flex h-full rounded-lg overflow-hidden">
           
              <div className={`fixed w-full lg:w-auto  top-0 lg:static  z-50 h-full ${isOpen?"left-0":"-left-full"}`}>
               
              <Sidebar />
              </div>

              {!selectedUser ? <NoChatSelected/> : <ChatContainer/>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
