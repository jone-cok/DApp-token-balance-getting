import React from 'react'


export interface IProductCard {
    name: string;
    description: string;
    price: string;
    imgsrc: string;
    imgalt: string;
    id?: string;
    allowed?: string;

    AddToCart?: () => void;
    EditProduct?: () => void;
    DeleteProduct?: () => void;


    showAddToCart: boolean;
    showEditProduct: boolean;
    showDeleteProduct: boolean;
    cardclassName?: string;
    cardstyle?: React.CSSProperties;
    imgclassName?: string;
    imgstyle?: React.CSSProperties;
    children?: React.ReactNode;
}


const ProductCard: React.FC<IProductCard> = ({ cardclassName, cardstyle, imgclassName, imgstyle, id, name, description, price, imgsrc, imgalt, allowed,
    showAddToCart, showDeleteProduct, showEditProduct, AddToCart, DeleteProduct, EditProduct, children }) => {

    const handleEditProduct = () => {
        // Add the item to the cart
        EditProduct && EditProduct();
    }
    const handleDeleteProduct = () => {
        // Add the item to the cart
        DeleteProduct && DeleteProduct();
    }
    const handleAddToCart = () => {
        // Add the item to the cart
        AddToCart && AddToCart();
    }

    return (
        <div className={"relative flex flex-col justify-center items-center w-full bg-white border border-solid border-[#7D9596]  my-[12px] hover-animate-back" + " " + cardclassName} style={cardstyle}>
            <a href='#' className={'w-full h-[210px] hover-animate-back' + ' ' + imgclassName} >
                <img src={imgsrc} alt={imgalt} className={"object-fill w-full h-full"} style={imgstyle} />
            </a>
            <div className='w-full flex flex-row justify-between items-center px-2'>
                <div className={'mt-[16px] text-[20px] text-black font-semibold'}>
                    {name}
                </div>
                <div className={'w-[30px]  flex justify-center items-center  rounded-2xl mt-[16px] text-[12px] text-black font-medium bg-green'}>
                    {id}
                </div>
            </div>

            <div className={'mt-[16px] w-full text-[14px] text-black font-medium px-2'}>
                {description}
            </div>
            <div className='w-full mt-[16px] border border-solid border-[#000000] border-opacity-20'></div>
            <div className='w-full flex flex-row justify-between items-center px-2'>
                <div className={'mt-[16px] text-[24px] text-black font-semibold'}>
                    ${price}
                </div>
                <div className={'w-[30px] flex justify-center items-center rounded-2xl mt-[16px] text-[12px] text-black font-medium bg-green'}>
                    {allowed}
                </div>
            </div>
            <div className='w-full flex flex-row justify-between items-center px-1'>
                {showAddToCart && <div className={'w-[45%]'}>
                    <button onClick={handleAddToCart} className='w-full flex justify-center items-center mt-[16px] text-white font-medium
                 bg-[#6C18D8] rounded-full px-5 py-2 border border-solid border-[#000000] mb-2'>
                        Buy
                    </button>
                </div>}
                {showEditProduct && <div className={'w-[45%]'}>
                    <button onClick={handleEditProduct} className='w-full flex justify-center items-center mt-[16px]  text-white font-medium
                 bg-[#6C18D8] rounded-full px-5 py-2 border border-solid border-[#000000] mb-2'>
                        Edit Product
                    </button>
                </div>}
                {showDeleteProduct && <div className={'w-[45%]'}>
                    <button onClick={handleDeleteProduct} className='w-full flex justify-center items-center mt-[16px] text-white font-medium
                 bg-[#6C18D8] rounded-full px-5 py-2 border border-solid border-[#000000] mb-2'>
                        Delete Product
                    </button>
                </div>
                }
            </div>
            {children}
        </div >
    )
}

export default ProductCard;
