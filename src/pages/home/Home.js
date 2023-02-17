import { Header } from "../commons";
import { Categories, Banner, HomeProducts } from "./components";
import style from "./home.module.css";

export const Home = () => {

    return (
        <>
            <Header className={style.header} />

            <div className={style.container}>
                <Banner />
                <Categories />
                <HomeProducts />
            </div>
        </>
    )
};
