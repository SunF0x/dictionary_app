import { Link } from 'react-router-dom';
import React from 'react';

const Dictionary = () => {
  return (
    <div className="static bg-neutral-100">
      <div className="relative m-2.5 min-h-16 rounded-md bg-[#81bef5]">
        <h5 className="px-8 py-4 text-xl text-white">Word Keeper</h5>
        <Link to="/favorites">
          <button className="absolute inset-y-0 right-0 pr-8 text-xl text-white">
            ★ Starred Words
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Dictionary;
