import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api';
import { Product, Stock } from '../types';

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem('@RocketShoes:cart')

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  const [products, setProducts] = useState<Omit<Product, 'amount'>[]>([])
  const [stock, setStock] = useState<Stock[]>([])

/*   useEffect(()=>{
    api.get('/stock').then(response=>{
      setStock(response.data)
    })
  },[])

  useEffect(()=>{
    api.get('/products').then(response=>{
      setProducts(response.data)
    })
  },[]) */

  const findProductInCar = (id: number)=>{
    const index = cart.findIndex(cartItem => {
      return cartItem.id === id
    })

    return cart[index]
  }

  const addProduct = async (productId: number) => {
    try {

      const productInTheCar = findProductInCar(productId)

      let newArray: Product[]

      if(productInTheCar){
        updateProductAmount({
          productId: productInTheCar.id, 
          amount: productInTheCar.amount + 1
        })

      }else{
        const { data: product } = await api.get(`/products/${productId}`)

        newArray = [...cart, {...product, amount: 1}]

        localStorage.setItem(
          '@RocketShoes:cart', 
          JSON.stringify(newArray)
        )
  
        setCart(newArray)
      }
    } catch {
      toast.error('Erro na adição do produto')
    }
  };

  const removeProduct = (productId: number) => {
    try {
      const productInTheCar = findProductInCar(productId)

      if(!productInTheCar){
        toast.error('Erro na remoção do produto')
        return
      }

      const newArray = cart.filter(cartItem => {
        return cartItem.id !== productId
      })

      localStorage.setItem(
        '@RocketShoes:cart', 
        JSON.stringify(newArray)
      )

      setCart(newArray)
    } catch {
      toast.error('Erro na remoção do produto')
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      const { data: productInStock } = await api.get(`/stock/${productId}`)

      console.log(productInStock)

      if(amount < 1){
        return 
      }

      if(productInStock.amount < amount){
        toast.error('Quantidade solicitada fora de estoque')
        return
      }

      const newArray = cart.map(cartItem => {
        if(cartItem.id === productId){
          return {...cartItem, amount: amount}
        }

        return cartItem
      })

      localStorage.setItem(
        '@RocketShoes:cart', 
        JSON.stringify(newArray)
      )

      setCart(newArray)
    } catch {
      toast.error('Erro na alteração de quantidade do produto')
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
