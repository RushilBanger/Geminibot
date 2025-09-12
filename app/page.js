// pages/index.js
import ChatAI from "../components/ChatAI";

export default function Home() {
  return (
    <>
    <h1 className="gap-2 absolute flex items-center justify-center mx-auto my-auto font-bold text-orange-600  text-5xl py-3 px-10">IndieGinie <div class="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin h-7 w-7 text-white"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg></div> </h1>
    
    
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <ChatAI />
    </div>
    </>
  );
}
