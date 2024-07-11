import { Link } from "react-router-dom";
import { PiCalendar, PiBooks } from "react-icons/pi";
import { BiUserCircle,BiShow } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete, MdSubject } from "react-icons/md";
import { useState } from "react";
import BookModel from "./BookModel";

const BookSingleCard = ({ book }) => {
    const [showModel,setShowModel]=useState(false);
  return (
    <div
      key={book._id}
      className="border-2 border-sky-900 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl"
    >
      <div className="flex justify-start items-center gap-x-2">
        <PiCalendar className="text-red-300 text-2xl" />
        <h2 className="my-1">{book.publishYear}</h2>
      </div>
      <div className="flex justify-start items-center gap-x-2">
        <MdSubject className="text-red-300 text-2xl" />
        <h2 className="my-1">{book.title}</h2>
      </div>
      <div className="flex justify-start items-center gap-x-2">
        <PiBooks className="text-red-300 text-2xl" />
        <h2 className="my-1">{book.bookCount}</h2>
      </div>
      <div className="flex justify-start items-center gap-x-2">
        <BiUserCircle className="text-red-300 text-2xl" />
        <h2 className="my-1">{book.author}</h2></div>
        <div className="flex justify-betwen items-center gap-x-2 mt-4 p-4">
          <Link to={"/books/details/${book._id"}>
            <BsInfoCircle className="text-2xl text-green-800 hover:text-black" />
          </Link>
          <Link to={"/books/details/${book._id"}>
            <AiOutlineEdit className="text-2xl text-yellow-600 hover:text-black" />
          </Link>
          <Link to={"/books/details/${book._id"}>
            <MdOutlineDelete className="text-2xl text-red-600 hover:text-black" />
          </Link>
        </div>
      {showModel&&(
        <BookModel book ={book} onClose={()=>setShowModel(false)}/>
      )}
    </div>
  );
};

export default BookSingleCard;
