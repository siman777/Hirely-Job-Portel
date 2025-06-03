// import { Header } from "@/components/Header";
// import React from "react";
// import { Outlet } from "react-router-dom";

// export default function AppLayout() {
//   return (
//     <div>
//       <div className="grid-background"></div>
//       <main className="min-h-screen container">
//         <Header />
//         <Outlet />
//       </main>
//       <div className="p-10 text-center bg-gray-800 mt-10">Made with ❤️ by Siman</div>
//     </div>
//   );
// }

import { Header } from "@/components/Header";
import React from "react";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="grid-background"></div>
      <main className="flex-grow p-5 m-0 w-full ">
        <Header />
        <Outlet />
      </main>
      
      <div className="p-6 text-center bg-gray-900 mt-10 text-white">
    <p>Made with ❤️ by Siman</p>
    <div className="mt-4">
        <a
            href="https://github.com/siman777"
            className="text-gray-400 mx-2 hover:text-white"
            target="_blank" rel="noopener noreferrer"
        >
            GitHub
        </a>
        <a
            href="https://www.instagram.com/siman.777"
            className="text-gray-400 mx-2 hover:text-white"
            target="_blank" rel="noopener noreferrer"
        >
            Instagram
        </a>
        <a
            href="https://www.linkedin.com/in/simanraj"
            className="text-gray-400 mx-2 hover:text-white"
            target="_blank" rel="noopener noreferrer"
        >
            LinkedIn
        </a>
    </div>
</div>
    </div>
  );
}
