import React from "react";
import LogoHeader from "../LogoHeader/LogoHeader";
import { useNavigate } from "react-router";

const VideoPage: React.FC = () => {
  const navigate = useNavigate();

  const goToSignUp = () => {
    navigate('/sign-up')
  }
  return (
    <>
    <LogoHeader />
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100 video-container-phone">
      <div className="w-full max-w-4xl bg-white p-6 rounded-2xl shadow-lg">
        <div className="aspect-w-16 aspect-h-9 bg-gray-300 rounded-lg"></div>
        <div style={{padding:'56.25% 0 0 0', position:'relative'}}>
            <iframe
            style={{position:'absolute', top:'0', left:'0', width:'100%', height:'100%'}}
            src="https://player.vimeo.com/video/1054668770?h=41cda68126&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" 
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" 
            title="Co-Lab-o-Rate // 55 Second Pitch Video">
            </iframe>
        </div>
        <script src="https://player.vimeo.com/api/player.js"></script>
      </div>
    </div>
    <div>
    <button
            className="inline-block bg-yellow-100 text-black rounded-xl w-30 p-3 leading-none mt-3 ml-3 border-2 border-yellow-500"
            onClick={goToSignUp}
          >
            Start!
          </button>
    </div>
    </>
  );
};

export default VideoPage;
