import Header from "./commons/Header";
import styles from "./home.module.css";

function Home() {

    const bgImages = [
        "https://m.media-amazon.com/images/I/61jovjd+f9L._SX3000_.jpg",
        "https://m.media-amazon.com/images/I/61DUO0NqyyL._SX3000_.jpg",
        "https://m.media-amazon.com/images/I/71qid7QFWJL._SX3000_.jpg",
        "https://m.media-amazon.com/images/I/61TD5JLGhIL._SX3000_.jpg",
        "https://m.media-amazon.com/images/I/71tIrZqybrL._SX3000_.jpg"
    ];

    return (
        <div className={styles.root}>
            <Header />

        </div>
    )
}

export default Home;