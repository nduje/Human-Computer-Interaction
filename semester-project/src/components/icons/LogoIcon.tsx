import { FC, SVGProps } from "react";
import Image from "next/image";
import Logo from "../images/violin_logo.png"
import { Pacifico } from "next/font/google";

const stroke = {
    textShadow: '-1px -1px 0 #FFDEA9, 1px -1px 0 #FFDEA9, -1px 1px 0 #FFDEA9, 1px 1px 0 #FFDEA9',
};

const LogoIcon: FC = () => {
  return (
        <div className="font-pacifico flex flex-row justify-between align-middle w-64 h-48">
            <div>
                <h1 style={stroke} className="font-pacifico text-9xl font-bold text-secondary-brown-700">G</h1>
            </div>
            <div className="flex flex-col justify-center align-middle">
                <Image 
                    src={Logo}
                    alt={"logo"}
                    width={100}
                    height={100}
                    style={{transform: 'rotate(270deg)'}}
                />
                <h2 style={stroke} className="font-pacifico text-5xl font-bold text-primary-grey-500">String</h2>
           </div>
        </div>
    );
  };
  
  export default LogoIcon;