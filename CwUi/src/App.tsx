import { Route, Routes } from 'react-router-dom'
import NavBar from './navbar/NavBar'
import Profile from './sender/page/Profile'
import SenderPage from './sender/page/SenderPage'
import { SenderProvider } from './sender/service/SenderService'
import Goods from './sender/page/Goods'
import { GoodProvider } from './sender/service/GoodService'
import NewGood from './sender/page/NewGood'
import { WHProvider } from './sender/service/WHService'
import WareHouse from './sender/page/WareHouse'
import { CustomerProvider } from './customer/service/CustomerService'
import CustomerPage from './sender/page/Customer'
import { ShopProvider } from './shop/service/ShopService'
import Shop from './shop/page/Shop'
import Home from './home/Home'
import CustomerOrderProvider from './order/service/OrderService'
import CustomerOrders from './order/page/Orders'
import SenderOrderProvider from './order/service/SenderOrderService'
import SenderOrders from './order/page/SenderOrders'

function App() {
    return (
        <div className="flex flex-col text-xl min-h-screen">
            <NavBar />
            <div className="flex grow">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route
                        path="/sender"
                        element={
                            <SenderProvider>
                                <SenderPage />
                            </SenderProvider>
                        }
                    />
                    <Route
                        path="/customer"
                        element={
                            <CustomerProvider>
                                <CustomerPage />
                            </CustomerProvider>
                        }
                    />
                    <Route
                        path="/shop"
                        element={
                            <CustomerProvider>
                                <ShopProvider>
                                    <Shop />
                                </ShopProvider>
                            </CustomerProvider>
                        }
                    />
                    <Route
                        path="/goods"
                        element={
                            <GoodProvider>
                                <Goods />
                            </GoodProvider>
                        }
                    />
                    <Route
                        path="/newgood"
                        element={
                            <GoodProvider>
                                <NewGood />
                            </GoodProvider>
                        }
                    />
                    <Route
                        path="/warehouse"
                        element={
                            <GoodProvider>
                                <WHProvider>
                                    <WareHouse />
                                </WHProvider>
                            </GoodProvider>
                        }
                    />
                    <Route
                        path="/receiving"
                        element={
                            <CustomerOrderProvider>
                                <CustomerOrders />
                            </CustomerOrderProvider>
                        }
                    />
                    <Route
                        path="/history"
                        element={
                            <SenderOrderProvider>
                                <SenderOrders />
                            </SenderOrderProvider>
                        }
                    />
                    <Route
                        path="*"
                        element={
                            <p className="mx-auto my-auto text-8xl font-extrabold">
                                404
                            </p>
                        }
                    />
                </Routes>
            </div>
        </div>
    )
}

export default App
