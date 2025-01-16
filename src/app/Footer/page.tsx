import Image from 'next/image';


const Footer = () => {
    return (
        <div>
      <div className="bg-[#09314D] font-inter lg:px-[350px] ">
       <div className='container mx-auto md:px-10 px-4 pt-14 grid grid-cols-5 lg:px-0 '>
        <div className='md:col-span-3 col-span-5 flex h-full items-center'><div>
      <h2 className="text-base font-bold text-[#FFFFFF] leading-[24px]">
        API Publication
      </h2 >
      <h2 className="text-[32px] text-[#FF8000] font-bold mb-6 leading-[37.57px]">
      Reach new heights with API Setu
      </h2>
      <p className="text-l max-w-screen-md mb-6 relative leading-[30px] text-[#E7E7E7]">Unleash the power of APIs! Add your own collections to our marketplace and join the API revolution today.</p>
      </div></div>
      <div className='md:col-span-2 col-span-5 '>
      <Image
          src="/footer.png" 
          alt="Footer Illustration"
          width={400}
          height={400} 
          className="object-contain "
        />
      </div></div>
      </div>

      <div className="bg-white lg:px-[350px] py-8 ">
        <div className="flex mb-6">
          <Image
            src="/logo_1.webp"
            alt="Company Logo"
            width={100}
            height={100}
            className="h-auto w-auto"
          />
        </div>
        <div className="flex justify-center space-x-48 ">
          <ul className="flex flex-col gap-y-2">
            <li className="text-[#6B7280] hover:text-[#FF9100] text-sm font-bold mb-4">Home</li>
            <li className="text-[#6B7280] hover:text-[#FF9100] text-sm font-bold mb-4">About Us</li>
            <li className="text-[#6B7280] hover:text-[#FF9100] text-sm font-bold mb-4">Directory</li>
            <li className="text-[#6B7280] hover:text-[#FF9100] text-sm font-bold mb-4">Blog</li>
            <li className="text-[#6B7280] hover:text-[#FF9100] text-sm font-bold mb-4">Join Us</li>
            <li className="text-[#6B7280] hover:text-[#FF9100] text-sm font-bold mb-4">Dashboard</li>
          </ul>
          <ul className="flex flex-col gap-y-2">
            <li className="text-[#6B7280] hover:text-[#FF9100] text-sm font-bold mb-4">Utilities</li>
            <li className="text-[#6B7280] hover:text-[#FF9100] text-sm font-bold mb-4">API Policies</li>
            <li className="text-[#6B7280] hover:text-[#FF9100] text-sm font-bold mb-4">Data Standards</li>
            <li className="text-[#6B7280] hover:text-[#FF9100] text-sm font-bold mb-4">Developer</li>
            <li className="text-[#6B7280] hover:text-[#FF9100] text-sm font-bold mb-4">Digilocker</li>
            <li className="text-[#6B7280] hover:text-[#FF9100] text-sm font-bold mb-4">Information Videos</li>
          </ul>
        </div>
        
      </div>
      
    </div>
    );
  };
  
  export default Footer;
  