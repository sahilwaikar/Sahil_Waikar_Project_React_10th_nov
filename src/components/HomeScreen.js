import { useState, useEffect } from 'react';
import '../style/Home.css';
import { addFavoriteMy } from '../redux/favourite';
import { useDispatch } from 'react-redux';
import { addBook } from '../redux/booklist';
import { useSelector } from 'react-redux/es/hooks/useSelector';

let Home = () => {
    const booklist = useSelector((state) => state.booklist);
    const dispatch = useDispatch();
    const [bookName, setBookName] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [book_id, setBook_id] = useState();
    const [book_thumb, setBook_thumb] = useState('');
    const [book_title, setBook_title] = useState('');
    const [book_price, setBook_price] = useState();
    const [book_link, setBook_link] = useState();
    let callApi = async () => {
        let res = await fetch('https://www.googleapis.com/books/v1/volumes?q=' + bookName + '&key=AIzaSyDP0xKm4lEpjEo6hSLE6POD1YrkjSq7pvQ');
        let jsonResponse = await res.json();
        console.log(jsonResponse.items);
        dispatch(addBook(jsonResponse.items));
        setTimeout(() => {
            setIsLoading(false);
        }, 2000)
    }
    const searchBook = (evt) => {
        if (evt.key === "Enter") {
            callApi();
        }
    }
    useEffect(() => {
        if (book_id !== undefined) {
            var fevBooklist = {}
            function booklistfav() {
                if (book_thumb == undefined) {
                    setBook_thumb('https://imgs.search.brave.com/m_L4QqWiBWiqcGPvH3lgYpE0nC80Kl747Pp-EuU0Y6A/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0cv/MDEvaW1nMTUvYm9v/a3Mvb3RoZXIvMTcw/MDJfYm9va3NfQUJS/LWhxcF83NXg3NS5f/U0w3NV9DQjQ4NTkz/NTA3NF8uanBn');
                }
                if (book_price != undefined)
                    var fevBooklist = {
                        book_link: book_link,
                        book_id: book_id,
                        thumbnail: book_thumb,
                        book_title: book_title,
                        price: book_price
                    }
                else {
                    var fevBooklist = {
                        book_link: book_link,
                        book_id: book_id,
                        thumbnail: book_thumb,
                        book_title: book_title,
                        price: 'Not avaiable'
                    }
                }
                dispatch(addFavoriteMy(fevBooklist));
            }
            booklistfav()
        }
    }, [book_id])



    return isLoading ? (
        <div className='Book_finder'>
            <div className='Book_inner row'>
                <div className='left_div col-md-7'></div>
                <div className='right_div col-md-5'>
                    <div className='right_inner_div'>
                        <div className='book_search'>
                            <input id='book_input' type='text' value={bookName} placeholder='Search...' onChange={e => { setBookName(e.target.value) }} onKeyDown={searchBook} />
                            <button id='book_btn' onClick={callApi}><i className="bi bi-search"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
        :
        (
            <div className='Book_finder'>
                <div className='Book_inner row'>
                    <div className='left_div col-md-7'></div>
                    <div className='right_div col-md-5'>
                        <div className='right_inner_div'>
                            <div className='book_search'>
                                <input id='book_input' type='text' value={bookName} placeholder='Search...' onChange={e => { setBookName(e.target.value) }} onKeyDown={searchBook} />
                                <button id='book_btn' ><i className="bi bi-search"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='book_shelf row'>
                    {booklist.map((item) => {
                        {
                            if (item.volumeInfo?.imageLinks?.smallThumbnail != undefined) {
                                return (
                                    <div className="card col-md-3 ms-auto me-auto">
                                        <img src={item.volumeInfo?.imageLinks?.smallThumbnail} className="card-img-top book_img" />
                                        <div className="card-body">
                                            <button onClick={() => {
                                                setBook_link(item.selfLink)
                                                setBook_id(item.id)
                                                setBook_thumb(item.volumeInfo?.imageLinks?.smallThumbnail)
                                                setBook_title(item.volumeInfo?.title)
                                                setBook_price(item.saleInfo?.listPrice?.amount)
                                            }}><i className="bi bi-star"></i></button>
                                            <h4 className="book_title">{item?.volumeInfo?.title}</h4>
                                            <h5 className="book_price">&#8377;{item.saleInfo.listPrice?.amount}</h5>
                                        </div>

                                    </div>

                                )
                            }
                        }

                    })

                    }
                </div>

            </div>
        )
}
export default Home;