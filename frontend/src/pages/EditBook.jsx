import React, { useEffect, useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [bookCount, setBookCount] = useState(0); // Add state for book count
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const blackBackgroundColor = 'rgb(255, 255, 255)';
  const whiteTextColor = 'rgb(0,0,0)';

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setTitle(response.data.title);
        setBookCount(response.data.bookCount || 0); // Set book count from API response
      })
      .catch((error) => {
        enqueueSnackbar('Error fetching book data', { variant: 'error' });
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, enqueueSnackbar]);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
      bookCount, // Include book count in the data object
    };

    setLoading(true);
    axios.put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        enqueueSnackbar('Book Edited Successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        enqueueSnackbar('Error editing book', { variant: 'error' });
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className='p-4'>
      <div className='flex flex-row justify-evenly w-[250px]'>
      <BackButton />
      <h1 className='text-3xl '>Edit Book</h1>
      </div>
      {loading && <Spinner />}
      <div className='flex flex-col border-2 border-sky-900 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-black'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ backgroundColor: blackBackgroundColor, color: whiteTextColor }}
            className='border-1 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-black'>Author</label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            style={{ backgroundColor: blackBackgroundColor, color: whiteTextColor }}
            className='border-1 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-black'>Publish Year</label>
          <input
            type='text'
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            style={{ backgroundColor: blackBackgroundColor, color: whiteTextColor }}
            className='border-1 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-black'>Book Count</label>
          <input
            type='number'
            value={bookCount}
            onChange={(e) => setBookCount(parseInt(e.target.value, 10))}
            style={{ backgroundColor: blackBackgroundColor, color: whiteTextColor }}
            className='border-1 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-900 text-white m-8' onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBook;
