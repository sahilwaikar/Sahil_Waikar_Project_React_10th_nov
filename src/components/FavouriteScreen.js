import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeFromfev } from '../redux/favourite'
import '../style/favorite.css'

let FavoriteList = () => {
    const dispatch = useDispatch();
    const [book_link, setBook_Link] = useState();
    const [book_id, setBook_id] = useState();
    const [book_thumb, setBook_thumb] = useState('');
    const [book_title, setBook_title] = useState('');
    const [book_price, setBook_price] = useState();
    const [book_des, setBook_des] = useState();
    const [book_big_thumb, setBook_big_thumb] = useState();
    const favlist = useSelector((state) => state.favorite);

    function removeProduct() {
        let removeFevList = {
            book_id: book_id,
            thumbnail: book_thumb,
            book_title: book_title,
            price: book_price
        }
        dispatch(removeFromfev(removeFevList));
    }

    let bookdetails = async () => {
        let res = await fetch(book_link);
        let jsonResponse = await res.json();
        setBook_big_thumb(jsonResponse?.volumeInfo?.imageLinks?.thumbnail);
        setBook_des(jsonResponse?.volumeInfo?.description);
        console.log(book_des);
    }


    return (
        <div className='book_shelf row'>
            {favlist.map((item) => {
                {
                    if (item.thumbnail != undefined) {

                        return (
                            <div className="card col-md-3 ms-auto me-auto">
                                <img src={item.thumbnail} className="card-img-top book_img" />
                                <div className="card-body">
                                    <button onClick={() => {
                                        setBook_id(item.id)
                                        setBook_thumb(item.thumbnail)
                                        setBook_title(item.book_title)
                                        setBook_price(item.price)
                                        removeProduct()
                                    }}>remove</button>
                                    <button onClick={() => {
                                        setBook_title(item.book_title)
                                        setBook_price(item.price)
                                        setBook_Link(item.book_link)
                                        bookdetails()
                                    }}>show more</button>
                                    <h4 className="book_title">{item.book_title}</h4>
                                    <h5 className="book_price">&#8377;{item.price}</h5>
                                </div>

                            </div>


                        )



                    }
                }


            })
            }
            <div className="book_des">
                <img className='book_des_img' src={book_big_thumb} />
                <h3 className='book_des_head'>{book_title}</h3>
                <p>{book_des}</p>
            </div>
        </div>
    )
}
export default FavoriteList