import { FC, SVGProps } from "react";
import Image from "next/image";
import Logo from "../images/violin_logo.png"
import { Pacifico } from "next/font/google";

const stroke = {
    textShadow: '-1px -1px 0 #FFDEA9, 1px -1px 0 #FFDEA9, -1px 1px 0 #FFDEA9, 1px 1px 0 #FFDEA9',
};

const LogoIcon: FC = () => {
  return (
        <div className="font-pacifico flex flex-row justify-between align-middle md:w-64 md:h-48">
            <div className="hidden md:flex">
                <h1 style={stroke} className="font-pacifico text-9xl font-bold text-secondary-brown-700">G</h1>
            </div>
            <div className="flex flex-col justify-start pt-2 pl-2 md:pt-0 md:pl-2 md:justify-center align-middle">
                <div className="flex">
                    <Image 
                        src={Logo}
                        alt={"logo"}
                        className="w-16 h-16 md:w-24 md:h-24"
                        style={{transform: 'rotate(270deg)'}}
                    />
                </div>
                <div className="flex">
                    <h2 style={stroke} className="invisible md:visible font-pacifico md:text-5xl font-bold text-primary-grey-500">String</h2>
                </div>
           </div>
        </div>
    );
  };
  
  export default LogoIcon;