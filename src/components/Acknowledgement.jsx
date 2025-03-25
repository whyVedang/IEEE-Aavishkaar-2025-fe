import React from 'react';
import { AlarmCheck,Users } from 'lucide-react';
import { useParams } from "react-router";
import {whatsappLinks} from "../configs/whatsapp.config"

const RegistrationSuccess = () => {
  const {id} = useParams();

  const handleWhatsAppRedirect = () => {
    // Open WhatsApp group link in a new tab
    window.open(whatsappLinks[id], '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="formSection w-full max-w-md text-center">
        <div className="flex justify-center mb-6">
          <AlarmCheck size={64} className="text-green-500" />
        </div>
        
        <h2 className="textGradient text-3xl font-bold mb-4">
          Registration Successful!
        </h2>
        
        <p className="text-white mb-6">
          You've successfully registered for the event. 
          Join our WhatsApp group to stay updated.
        </p>
        
        <button 
          onClick={handleWhatsAppRedirect}
          className="
            flex items-center justify-center 
            w-full max-w-xs mx-auto 
            bg-green-500 hover:bg-green-600 
            text-white font-bold py-3 px-6 
            rounded-lg 
            transform transition-all duration-300 
            hover:scale-105 active:scale-95 
            shadow-lg hover:shadow-xl 
            cursor-pointer 
            group
          "
        >
          <Users className="mr-3 group-hover:animate-pulse" size={24} />
          Join WhatsApp Group
        </button>
      </div>
    </div>
  );
};

export default RegistrationSuccess;