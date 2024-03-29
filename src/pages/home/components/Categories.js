import { memo } from "react";
import { SimpleCard } from "components/card";
import styles from "./categories.module.css";

const cards = [
    {
        title: "Get fit at home",
        imageURL: [
            "https://images-na.ssl-images-amazon.com/images/W/WEBP_402378-T2",
            "/images/G/01/events/GFAH/GWDesktop_SingleImageCard_fitathome_1x.",
            "_SY304_CB434924743_.jpg"
        ].join(""),
        link: "/search?category=Sports+%26+Outdoors",
        linkLabel: "Explore now"
    },
    {
        title: "Beauty picks",
        imageURL: [
            "https://images-na.ssl-images-amazon.com/images/W/WEBP_402378-T2",
            "/images/G/01/AmazonExports/Fuji/2020/May/Dashboard",
            "/Fuji_Dash_Beauty_1x._SY304_CB432774351_.jpg"
        ].join(""),
        link: "/search?category=Beauty+%26+Personal+Care",
        linkLabel: "Shop now"
    },
    {
        title: "Electronics",
        imageURL: [
            "https://images-na.ssl-images-amazon.com/images/W/WEBP_402378-T2",
            "/images/G/01/AmazonExports/Fuji/2020/May/Dashboard",
            "/Fuji_Dash_Electronics_1x._SY304_CB432774322_.jpg"
        ].join(""),
        link: "/search?category=Electronics",
        linkLabel: "See more"
    },
    {
        title: "Shop Laptops & Tablets",
        imageURL: [
            "https://images-na.ssl-images-amazon.com/images/W/WEBP_402378-T2",
            "/images/G/01/AmazonExports/Fuji/2020/May/Dashboard",
            "/Fuji_Dash_Laptops_379x304_1X_en_US._SY304_CB418608471_.jpg"
        ].join(""),
        link: "/search?category=Computers",
        linkLabel: "See more"
    },
    {
        title: "For your Fitness Needs",
        imageURL: [
            "https://images-na.ssl-images-amazon.com/images/G/01",
            "/AmazonExports/Fuji/2021/September/DashboardCards",
            "/Fuji_Dash_Fitness_1X._SY304_CB639748186_.jpg"
        ].join(""),
        link: "/search?category=All&title=work+from+home+fitness",
        linkLabel: "Shop now"
    },
    {
        title: "Shop Pet supplies",
        imageURL: [
            "https://images-na.ssl-images-amazon.com/images/G/01",
            "/AmazonExports/Fuji/2021/September/DashboardCards",
            "/Fuji_Dash_Pets_1X._SY304_CB639746743_.jpg"
        ].join(""),
        link: "/search?category=All&title=pet+supplies",
        linkLabel: "See more"
    },
    {
        title: "Shop activity trackers and smartwatchess",
        imageURL: [
            "https://images-na.ssl-images-amazon.com/images/G/01",
            "/AmazonExports/Fuji/2021/September/DashboardCards",
            "/Fuji_Dash_SmartWatch_1X._SY304_CB639922137_.jpg"
        ].join(""),
        link: "/search?category=All&title=trackers+and+smartwatches",
        linkLabel: "Shop now"
    },
    {
        title: "Tools and Home Improvement",
        imageURL: [
            "https://images-na.ssl-images-amazon.com/images/G/01/home/THILGMA/Holiday2022/Graphics",
            "/XCM_CUTTLE_1475305_2610205_379x304_1X_en_US._SY304_CB608600856_.jpg"
        ].join(""),
        link: "/search?category=Tools+%26+Home+Improvement",
        linkLabel: "Shop now"
    }
];

const Component = ({ className }) =>
    <ul className={`${styles.root}${className ? " " + className : ""}`}>
        {cards.map(card =>
            <li key={card.imageURL}>
                <SimpleCard
                    title={card.title}
                    imageSrc={card.imageURL}
                    link={card.link}
                    linkLabel={card.linkLabel}
                />
            </li>
        )}
    </ul>
;

export const Categories = memo(Component);
